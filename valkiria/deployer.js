module.exports = function(configMap) {
  const _config = configMap

  return function(keyOrObject, defaultValue) {
    const type = typeof keyOrObject;
    
    switch (type) {
      case 'string':
        const result = keyOrObject.split('.').reduce((accum, currentKey) => {
          return accum[currentKey];
        }, _config);
        return (result === void 0) ? defaultValue : result;
      
      case 'object':
        Object.entries(keyOrObject).forEach(([key, value]) => {
          const keyParts = key.split('.');
          const subConfigMap = keyParts.slice(0, -1).reduce((accum, currentKey) => {
            if (!accum[currentKey]) {
              accum[currentKey] = {}
            }
            return accum[currentKey];
          }, _config);
          subConfigMap[keyParts.pop()] = value;
        });
        break;
      
      default:
        return _config;
    }
  }
}
