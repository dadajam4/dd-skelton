const config      = require('app-root-path').require('/config');
const path        = require('path');
const svgIconList = require(path.join(config.path.config.svg, 'svg-icon-list'));



const docsSettings = {
  js: {
    entry: {
      docs: path.join(config.path.src.docs.js, 'index.js'),
    },
    outputPath: config.path.docs.assets.js,
    modules: [
      config.path.src.docs.js,
      config.path.src.root,
    ],
  },
  css: {
    name: 'docs',
    suffix: 'doc-',
  },
  svgIcon: {
    list: svgIconList,
  },
};



module.exports = docsSettings;
