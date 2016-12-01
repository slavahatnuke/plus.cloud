"use strict";

var Tar = require('./Tar');
var path = require('path');

module.exports = (ShService) => class BinTar extends Tar {
    compress(from, to) {
        var cwd = path.dirname(from);
        var name = path.basename(from);

        return ShService.call(`tar -czf '${to}' '${name}'`, {
            cwd: cwd
        });
    }

    uncompress(from, to) {
        return ShService.call(`tar -xzf '${from}' -C '${to}'`);
    }
};
 