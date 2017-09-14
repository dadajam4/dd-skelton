const config = require('app-root-path').require('/config');
const path   = require('path');



const publicSettings = {
  js: {
    entry: {
      dd: path.join(config.path.src.public.js, 'index.js'),
    },
    outputPath: config.path.public.assets.js,
    modules: [
      config.path.src.public.js,
      config.path.src.root,
    ],
  },
  css: {
    name: 'dd',
    key: 'dd',
    suffix: 'dd-',
  },
};



module.exports = publicSettings;
