const loaderUtils = require('loader-utils');



module.exports = function(source, map) {
  this.cacheable();

  const options = loaderUtils.getOptions(this);

  source = source.replace(/vn@/g, options.vue.nameSpace);
  this.callback(null, source, map);
};