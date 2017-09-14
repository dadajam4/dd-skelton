const config            = require('app-root-path').require('/config');
const webpack           = require('webpack');
const merge             = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');



module.exports = merge(baseWebpackConfig, {
  plugins: [

    // 圧縮
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },

      output: {
        comments  : false,
        semicolons: true,
      },
    }),
  ],
})
