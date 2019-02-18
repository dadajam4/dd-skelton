const config       = require('app-root-path').require('/config');
const path         = require('path');
const FileUtil     = require('dd-file-util');



const list = FileUtil.fileList(config.path.src.svgIcon).map(path => path.replace(/\.svg$/, ''));



module.exports = list;
