"use strict";

var WebTorrent = require('webtorrent');

module.exports = class DeployService {
    constructor(Options, TarService, TorrentService) {
        this.Options = Options;
        this.TarService = TarService;
        this.TorrentService = TorrentService;
    }

    init() {
        return new Promise((resolve, reject) => {
            resolve()
        });
    }

    download(magnet) {
        var to = '/Users/slava/Downloads/downloads';
        return this.TorrentService.download(magnet, to)
            .then((torrent) => {
                console.log(torrent.files);
            })
            .then(() => console.log('done'));
    }

    deploy() {
        var from = '.';
        var to = '/Users/slava/Downloads/test.tar';

        return this.TarService.compress(from, to)
            .then(() => this.TorrentService.seed(to))
            .then((torrent) => {
                console.log(torrent.magnetURI);
            })
            .then(() => {
                return new Promise((resolve, reject) => {

                });
            });
    }
};
