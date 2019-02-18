const path          = require('path');
const DDPathSetting = require('../lib/dd-path-setting');



const settings = {
  root: path.join(__dirname, '../'),
  config: {
    root   : 'config',
    task   : 'task',
    dist   : 'dist',
    css    : 'css',
    svg    : 'svg',
    webpack: 'webpack',
    server : 'server',
  },

  assets: {
    root: 'assets',
  },

  plugins: {
    root: 'plugins',
    ui: 'ui',
  },

  src: {
    root: 'src',
    tmp: {
      root: '.tmp',
      sass: 'sass',
    },
    constants: {
      root: 'constants',
      sass: 'sass',
    },
    sprite: 'sprite',
    svgIcon: 'svg-icon',
    img: 'img',
    css: 'css',
    js: 'js',
    html: 'html',
    files: 'files',
  },

  public: {
    root: 'public',
    assets: {
      root: 'assets',
      sprite: 'sprite',
      img: 'img',
      font: 'font',
      css: 'css',
      js: 'js',
    },
  },

  tasks: {
    root: 'tasks',
  },
  lib: {
    root: 'lib',
  },
};




const pathSettings = new DDPathSetting(settings);



module.exports = pathSettings;
