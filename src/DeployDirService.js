"use strict";

module.exports = class DeployDirService {
    constructor(FileService) {
        this.FileService = FileService;
        this.base = process.cwd() + '/.plus.cloud';
    }

    ensure() {
        return Promise.all([
            this.FileService.ensureDir(this.getFilesDir()),
            this.FileService.ensureDir(this.getDownloadDir())
        ]);
    }

    emptyFilesDir() {
        return this.FileService.emptyDir(this.getFilesDir());
    }

    getDownloadDir() {
        return this.base + '/download';
    }

    getFilesDir() {
        return this.base + '/version';
    }

};
