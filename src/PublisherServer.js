"use strict";

module.exports = class PublisherServer {
    constructor() {
        this.app = null;
        this.port = 10080;
        this.ips = [];
        this.trackerUrls = [];
    }

    start() {
        if (this.app) {
            return Promise.resolve();
        }

        return Promise.resolve()
            .then(() => {
                var app = require('express')();

                return new Promise((resolve, reject) => {

                    var Server = require('bittorrent-tracker').Server;
                    var server = new Server({
                        http: false, // we do our own
                        udp: false,  // not interested
                        ws: false
                    });

                    var onHttpRequest = server.onHttpRequest.bind(server);
                    app.get('/announce', onHttpRequest);
                    app.get('/scrape', onHttpRequest);
                    // onWebSocketConnection // todo

                    app.listen(this.port, (err, result) => err ? reject(err) : resolve(result));
                })
                    .then(() => console.log(`started :${this.port}`))
                    .then(() => this.app = app);
            })
            .then(() => {
                var os = require('os');
                var networkInterfaces = os.networkInterfaces();

                Object.keys(networkInterfaces)
                    .forEach((name) => {
                        networkInterfaces[name].forEach((iface) => {
                            if ('IPv4' == iface.family) {
                                this.ips.push(iface.address);
                            }
                        });
                    });
            })
            .then(() => {
                var announces = this.ips.map((ip) => `http://${ip}:${this.port}/announce`);
                this.trackerUrls = this.trackerUrls.concat(announces);
                console.log(this.trackerUrls);
            });
    }

    getTrackerUrls() {
        return this.trackerUrls;
    }

};
