const config       = require('app-root-path').require('/config');
const path         = require('path');
const sassSettings = require(path.join(config.path.config.css, 'sass-settings'));



module.exports = function vueCssLoaders(options = {}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize : options.minimize,
      sourceMap: options.sourceMap,
    },
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader];

    if (loader) {
      const baseOptions = Object.assign({}, loaderOptions, {sourceMap: options.sourceMap});
      const setOptions = loader === 'sass' ? Object.assign({}, baseOptions, sassSettings) : baseOptions;

      loaders.push({
        loader : `${loader}-loader`,
        options: setOptions,
      });

      loaders.push({
        loader: 'postcss-loader',
        options: baseOptions,
      });
    }

    loaders.forEach(obj => {
      if (obj.loader === 'postcss-loader') {
        obj.options = Object.assign({
          config: {
            path: path.join(config.path.config.css, 'postcss.config.js'),
          },
        }, obj.options);
      }
    });

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      });
    } else {
      return ['vue-style-loader'].concat(loaders);
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css    : generateLoaders(),
    postcss: generateLoaders(),
    less   : generateLoaders('less'),
    sass   : generateLoaders('sass', {indentedSyntax: true}),
    scss   : generateLoaders('sass'),
    stylus : generateLoaders('stylus'),
    styl   : generateLoaders('stylus'),
  };
}
