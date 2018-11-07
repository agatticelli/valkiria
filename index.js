const deployer = require('./valkiria/deployer');
const loaderBuilder = require('./valkiria/loader');

module.exports = configPath => {
  const loader = loaderBuilder();
  const loadedConfigMap = loader.loadPath(configPath);
  return deployer(loadedConfigMap);
};
