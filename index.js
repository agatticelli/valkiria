const deployer = require('./lib/valkiria/deployer');
const loaderBuilder = require('./lib/valkiria/loader');

module.exports = configPath => {
  const loader = loaderBuilder();
  const loadedConfigMap = loader.loadPath(configPath);
  return deployer(loadedConfigMap);
};
