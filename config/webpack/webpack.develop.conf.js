const config            = require('app-root-path').require('/config');
const merge             = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');



module.exports = merge(baseWebpackConfig, {
  devtool: 'source-map',
});
