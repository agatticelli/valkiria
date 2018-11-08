const fs = require('fs');
const path = require('path');

const Utils = require('../utils');

module.exports = function() {
  const _configMap = {};

  return {
    loadPath: function(options) {
      const type = Utils.typeof(options);
      if (type === 'string') {
        options = {path: options};
      }
      const stats = fs.statSync(options['path']);
      const parser = stats.isDirectory() ? 'parseDirectory' : 'parseFile';
      return Object.assign(_configMap, this[parser](options['path'], options));
    },

    parseFile: function(filePath, options) {
      if (this.suitableForParsing(filePath, options)) {
        // require the file
        const fileContent = require(path.resolve(filePath));

        return Object.assign({}, this.parseObject(fileContent));
      } else {
        return null;
      }
    },

    parseDirectory: function(directoryPath, options) {
      const paths = fs.readdirSync(directoryPath);
      const configMap = {};
      paths.forEach(subPath => {
        const fullPath = `${directoryPath}${path.sep}${subPath}`;

        // remove file's extension
        const parsedFile = this.parseFile(fullPath, options);
        if (parsedFile) {
          subPath = subPath.split('.').slice(0, -1).join('.');
          Object.assign(configMap, {[subPath]: parsedFile});
        }
      });

      return configMap;
    },

    parseObject: function(obj, filename) {
      return filename ? {[filename]: obj} : obj;
    },

    suitableForParsing: function(path, options) {
      if (options.extensions && Utils.typeof(options.extensions) === 'array') {
        return options.extensions.some(ext => RegExp(`\\.${ext}$`).test(path));
      }

      // if no parsing options where setted, then is always suitable
      return true;
    },

  };
};
