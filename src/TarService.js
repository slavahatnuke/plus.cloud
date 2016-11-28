"use strict";

module.exports = class TarService {
    constructor(ShService, BinTar, NodeTar) {
        this.ShService = ShService;
        this.BinTar = BinTar;
        this.NodeTar = NodeTar;
        this.tar = null;
    }

    get() {
        if (this.tar) {
            return Promise.resolve(this.tar);
        }

        return Promise.resolve()
            .then(() => this.ShService.has('tar'))
            .then((hasBin) => {
                if (hasBin) {
                    this.tar = new this.BinTar();
                } else {
                    this.tar = new this.NodeTar();
                }
                // this.tar = new this.BinTar();
                // this.tar = new this.NodeTar();
                return this.tar;
            });
    }

    compress(from, to) {
        return this.get().then((tar) => tar.compress(from, to));
    }

    uncompress(from, to) {
        return this.get().then((tar) => tar.uncompress(from, to));
    }
};
