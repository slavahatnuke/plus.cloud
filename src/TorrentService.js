"use strict";

var WebTorrent = require('webtorrent');

module.exports = class TorrentService {
    constructor(PublisherServer) {
        this.PublisherServer = PublisherServer;
    }

    getClient() {
        return Promise.resolve().then(() => {
            return new WebTorrent();
        });
    }

    download(magnet, to) {
        return this.getClient().then((client) => {
            return this.getTorrentOptions().then((options) => {
                options.path = to;

                return new Promise((resolve, reject) => {
                    client.add(magnet, options, (torrent) => {
                        torrent.on('done', () => resolve(torrent));
                    });
                });
            });
        });
    }

    seed(path) {
        return this.getClient()
            .then((client) => {
                return this.getTorrentOptions()
                    .then((options) => {
                        return new Promise((resolve, reject) => {
                            client.seed(path, options, (torrent) => {
                                resolve(torrent);
                            });
                        });
                    });
            });
    }

    getTorrentOptions() {
        return Promise.resolve().then(() => {
            return {
                announce: this.PublisherServer.getTrackerUrls()
            };
        });
    }

};
