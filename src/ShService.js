"use strict";

module.exports = class ShService {

    call(command, stringArguments, toStream) {
        var exec = require('child_process').exec;
        stringArguments = stringArguments || '';

        return new Promise((resolve, reject) => {
            var process = exec(command + ' ' + stringArguments, {
                maxBuffer: 1024 * 1024 * 1024 * 1024 * 1024
            }, (err) => {
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
        return this.call('which', command).then(() => true, () => false);
    }

};
