"use strict";

module.exports = (app) => {

    function done(err) {
        if (err) {
            console.log('[ERROR]', err, err.stack || '');
            setTimeout(() => process.exit(1), 500);
            return false;
        }

        process.exit(0);
    }

    var program = require('commander');

    program
        .version(require('../package.json').version)
        .option("-c, --config [config]", "config file")
        // .option("-p, --port [port]", "Port")
        // .option("-h, --host [host]", "Host")
        // .option("-k, --key [key]", "Key")
        // .option("-d, --dir [dir]", "Work dir")
        // .command('start')
        // .action(() => app.Server.start().then(() => 'ok', done))
    ;

    program.command('init')
        .description('init config file')
        .action((command) => app.DeployService.init().then(done, done));

    program.command('deploy')
        .description('deploy it')
        .action((command) => app.DeployService.deploy().then(done, (err) => {
            setTimeout(() => {
                console.log('ERROR >');
                console.log(err);
                console.log('\n');
                process.exit(1);
            }, 1000);
        }));

    return program;
};