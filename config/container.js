"use strict";

module.exports = (container) => {
  container.add('Commander', require('../src/Commander'), ['container']);
  container.add('DeployService', require('../src/DeployService'), ['Options']);
  container.add('Options', require('../src/Options'), ['config', 'Commander']);
};