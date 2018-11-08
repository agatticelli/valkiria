const fs = require('fs');
const path = require('path');

module.exports = function() {
  const _configMap = {};

  return {
    loadPath: function(basePath) {
      const stats = fs.statSync(basePath);
      const parser = stats.isDirectory() ? 'parseDirectory' : 'parseFile';
      return Object.assign(_configMap, this[parser](basePath));
    },

    parseFile: function(filePath) {
      const configMap = {};

      // require the file
      const fileContent = require(path.resolve(filePath));

      return Object.assign(configMap, this.parseObject(fileContent));
    },

    parseDirectory: function(directoryPath) {
      const paths = fs.readdirSync(directoryPath);
      const configMap = {};
      paths.forEach(subPath => {
        const fullPath = `${directoryPath}${path.sep}${subPath}`;

        // remove file's extension
        subPath = subPath.split('.').slice(0, -1).join('.');
        Object.assign(configMap, {[subPath]: this.parseFile(fullPath)});
      });

      return configMap;
    },

    parseObject: function(obj, filename) {
      return filename ? {[filename]: obj} : obj;
    },

  };
};
