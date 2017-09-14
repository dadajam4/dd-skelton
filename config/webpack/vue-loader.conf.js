const config              = require('app-root-path').require('/config');
const vueCssLoaders       = require('./vue-css-loaders');
const babelLoaderSettings = require('./babel-loader-settings');



const loaders = vueCssLoaders({
  minimize : config.isProduction,
  sourceMap: !config.isProduction,
});

loaders.js = `babel-loader?${babelLoaderSettings.queryString}`;



module.exports = {
  loaders: loaders,
}
