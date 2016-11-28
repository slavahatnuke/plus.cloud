"use strict";

var WebTorrent = require('webtorrent');

module.exports = class TorrentService {
    constructor() {

    }

    getClient() {
        return Promise.resolve().then(() => {
            return new WebTorrent();
        });
    }

    download(magnet, to) {
        return this.getClient().then((client) => {
            var opts = this.getTorrentOptions();
            opts.path = to;

            return new Promise((resolve, reject) => {
                client.add(magnet, opts, (torrent) => {
                    torrent.on('done', () => resolve(torrent));
                });
            });
        });
    }

    seed(path) {
        return this.getClient().then((client) => {
            return new Promise((resolve, reject) => {
                client.seed(path, this.getTorrentOptions(), (torrent) => {
                    resolve(torrent);
                });
            });
        });
    }

    getTorrentOptions() {
        var opts = {
            announce: ['http://localhost:8000/announce']
        };
        return opts;
    }

};
