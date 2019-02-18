// const config         = require('app-root-path').require('/config');
// const path           = require('path');
// const publicSettings = require(path.join(config.path.config.dist, 'public-settings'));
const sassVariables  = {};



// // Css Prefix
// sassVariables['css-prefix'] = publicSettings.css.prefix;



// Media Query Settings
const mediaQuerySettings = require('./media-query-settings');
sassVariables['media-query-target'] = mediaQuerySettings.target;
sassVariables['media-query-breakpoints'] = {};
sassVariables['media-query-groups'] = {};
mediaQuerySettings.breakPoints.forEach(breakPoint => {
  sassVariables['media-query-breakpoints'][breakPoint.key] = breakPoint;
  const conditions = [];
  if (breakPoint.min) conditions.push(`(min-width: ${breakPoint.min}px)`);
  if (breakPoint.max) conditions.push(`(max-width: ${breakPoint.max}px)`);
  sassVariables['media-query-breakpoints'][breakPoint.key].conditions = "'" + conditions.join(' and ') + "'";
});
for (let key in mediaQuerySettings.groups) {
  const group     = mediaQuerySettings.groups[key],
        target    = group.min ? 'min' : 'max',
        keyValue  = group[target],
        value     = sassVariables['media-query-breakpoints'][keyValue][target],
        condition = `(${target}-width: ${value}px)`;

  sassVariables['media-query-groups'][key] = condition;
}



module.exports = sassVariables;
