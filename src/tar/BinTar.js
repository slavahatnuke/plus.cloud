"use strict";

var Tar = require('./Tar');
module.exports = (ShService) => class BinTar extends Tar {
    compress(from, to) {
        return ShService.call('tar', `-czf ${to} ${from}`);
    }

    uncompress(from, to) {
        return ShService.call('tar', `-xzf ${from} -C ${to}`);
    }
};
 