const config = require('app-root-path').require('/config');
// const jsImporter = require('node-sass-js-importer');



const sassSettings = {
  // importer    : jsImporter,
  includePaths: [
    // config.path.src.tmp.sass,
    // config.path.src.constants.sass,
    // config.path.src.css,
    // config.path.src.docs.css,
  ],
};



module.exports = sassSettings;
