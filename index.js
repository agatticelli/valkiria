const fs = require('fs');

const deployer = require('./valkiria/deployer');
const Loader = require('./valkiria/loader');

module.exports = (configPath) => {
  const loader = Loader();
  const loadedConfigMap = loader.loadPath(configPath);
  return deployer(loadedConfigMap);
}
