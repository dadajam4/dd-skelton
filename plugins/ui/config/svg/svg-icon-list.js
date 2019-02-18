const path     = require('path');
const FileUtil = require('dd-file-util');


const SVG_DIR = path.join(__dirname, '..', '..', 'assets', 'svg-icon');
const list = FileUtil.fileList(SVG_DIR).map(path => path.replace(/\.svg$/, ''));



module.exports = list;
