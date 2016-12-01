"use strict";

var fs = require('fs-extra');
var glob = require('glob');

module.exports = class FileService {

    ensureDir(dir) {
        return new Promise((resolve, reject) => {
            fs.ensureDir(dir, (err) => err ? reject(err) : resolve());
        });
    }

    emptyDir(dir) {
        return new Promise((resolve, reject) => {
            fs.emptyDir(dir, (err) => err ? reject(err) : resolve());
        });
    }

    scan(basePath, pattern) {
        pattern = pattern || '*';
        return new Promise((resolve, reject) => {
            glob(pattern, {cwd: basePath}, (err, result) => err ? reject(err) : resolve(result));
        });
    }

};
