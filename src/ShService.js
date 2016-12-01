"use strict";

module.exports = class ShService {

    call(command, options, toStream) {
        var exec = require('child_process').exec;

        options = Object.assign({
            maxBuffer: 1024 * 1024 * 1024 * 1024 * 1024
        }, options || {});

        return new Promise((resolve, reject) => {
            var process = exec(command, options, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });

            if (toStream) {
                process.stdout.pipe(toStream);
                process.stderr.pipe(toStream);
            }
        });
    }

    has(command) {
        return this.call('which ' + command).then(() => true, () => false);
    }

};
