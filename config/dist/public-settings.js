const config = require('app-root-path').require('/config');
const path   = require('path');



const myName = 'dd';



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
  vue: {
    nameSpace: myName,
  },
  css: {
    name: myName,
    key: myName,
    prefix: myName + '-',
  },
};



module.exports = publicSettings;
