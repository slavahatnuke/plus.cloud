"use strict";

var WebTorrent = require('webtorrent');

module.exports = class DeployService {
    constructor(Options, TarService, TorrentService, DeployDirService, FileService) {
        this.Options = Options;
        this.TarService = TarService;
        this.TorrentService = TorrentService;
        this.DeployDirService = DeployDirService;
        this.FileService = FileService;
    }

    init() {
        return new Promise((resolve, reject) => {
            resolve()
        });
    }

    download(magnet) {
        var distDir = '/Users/slava/Downloads/downloads';

        var downloadTo = distDir + '/.plus.cloud';

        var timer = require('plus.timer').create('timer');
        timer.start();
        timer.log(1);

        return Promise.resolve()
            .then(() => this.FileService.ensureDir(downloadTo))
            .then(() => {
                return this.TorrentService.download(magnet, downloadTo)
                    .then((torrent) => {
                        timer.log(2);
                        var pathes = torrent.files.map((file) => file.path);
                        console.log(pathes);

                        return pathes;
                    })
                    .then((pathes) => {
                        var promises = pathes.map((path) => {
                            return this.TarService.uncompress(downloadTo + '/' + path, distDir);
                        });

                        return Promise.all(promises);
                    })
                    .then(() => timer.log(3))
                    .then(() => console.log('done'));
            });
    }

    deploy() {
        return Promise.resolve()
            .then(() => this.DeployDirService.ensure())
            .then(() => this.DeployDirService.emptyFilesDir())
            .then(() => {
                
                var from = '/Users/slava/Downloads/tracker';
                // var from = '.';
                var to = this.DeployDirService.getFilesDir();

                return this.FileService.scan(from)
                    .then((files) => {
                        console.log('files', files);
                        var promises = files.map((file) => {
                            return this.TarService.compress(from + '/' + file, to + '/' + file + '.tar.gz')
                        });

                        return Promise.all(promises);
                    })
                    .then(() => {

                        return this.TorrentService.seed(to)
                            .then((torrent) => {
                                console.log(torrent.magnetURI);
                            })
                            .then(() => {
                                return new Promise((resolve, reject) => {

                                });
                            });

                    })

            });

    }
};
