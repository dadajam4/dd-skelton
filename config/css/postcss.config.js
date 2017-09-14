const config                 = require('app-root-path').require('/config');
const path                   = require('path');
const autoprefixer           = require('autoprefixer');
const mqpacker               = require('css-mqpacker');
const cssnano                = require('cssnano');
const browserSupportSettings = require(path.join(config.path.config.root, 'browser-support-settings'));



module.exports = {
  plugins: [
    autoprefixer({
      browsers: browserSupportSettings,
    }),
    mqpacker,
    new cssnano({zindex: false}),
  ],
};
