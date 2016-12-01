"use strict";

module.exports = (container) => {
    container.add('Commander', require('../src/Commander'), ['container']);
    
    container.add('DeployService', require('../src/DeployService'), 
        ['Options', 'TarService', 'TorrentService', 'DeployDirService', 'FileService']);
    
    container.add('Options', require('../src/Options'), ['config', 'Commander']);
    container.add('ShService', require('../src/ShService'), []);

    container.add('TarService', require('../src/TarService'), ['ShService', 'BinTar', 'NodeTar']);
    container.add('TorrentService', require('../src/TorrentService'), ['ShService', 'BinTar', 'NodeTar']);
    container.add('FileService', require('../src/FileService'), []);
    container.add('DeployDirService', require('../src/DeployDirService'), ['FileService']);

    container.add('BinTar', require('../src/tar/BinTar'), ['ShService']);
    container.add('NodeTar', require('../src/tar/NodeTar'), ['ShService']);

};