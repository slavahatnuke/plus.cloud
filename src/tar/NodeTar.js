"use strict";

var Tar = require('./Tar');

var tarFs = require('tar-fs');
var fs = require('fs');
var gunzip = require('gunzip-maybe');

module.exports = () => class NodeTar extends Tar {
    compress(from, to) {
        return new Promise((resolve, reject) => {
            var writer = fs.createWriteStream(to);
            writer.on('error', reject);
            writer.on('end', resolve);
            tarFs.pack(from).pipe(gunzip()).pipe(writer);
        });
    }

    uncompress(from, to) {
        return new Promise((resolve, reject) => {
            var reader = fs.createReadStream(from);
            reader.on('error', reject);
            reader.on('end', resolve);
            reader.pipe(gunzip()).pipe(tarFs.extract(to));
        });
    }
};
 