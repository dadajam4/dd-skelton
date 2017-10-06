const config              = require('app-root-path').require('/config');
const path                = require('path');
const webpack             = require('webpack');
const vueLoaderConfig     = require('./vue-loader.conf');
const babelLoaderSettings = require('./babel-loader-settings');
const publicSettings      = require(path.join(config.path.config.dist, 'public-settings'));
const docsSettings        = require(path.join(config.path.config.dist, 'docs-settings'));



module.exports = {
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js?v=' + (+new Date),
    publicPath: 'assets/js/',
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      path.join(config.path.root, 'lib'),
      path.join(config.path.root, 'node_modules'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV'        : `'${config.env}'`,
      'IS_PRODUCTION'               : config.isProduction,
      'IS_DEVELOP'                  : config.isDevelop,
      'publicSettings.vue.nameSpace': `'${publicSettings.vue.nameSpace}'`,
      'publicSettings.css.key'      : `'${publicSettings.css.key}'`,
      'publicSettings.css.prefix'   : `'${publicSettings.css.prefix}'`,
      'docsSettings.svgIcon.list'   : JSON.stringify(docsSettings.svgIcon.list),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query  : babelLoaderSettings.query,
      },

      {
        test: /\.ya?ml$/,
        loader: 'json-loader!yaml-loader',
      },

      {
        test: /\.json$/,
        loader: 'json-loader',
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loaders: 'url-loader',
      },
    ]
  }
}
