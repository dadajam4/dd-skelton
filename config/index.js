const myPackage    = require('../package');
const pathSettings = require('./path-settings');



const ENV = process.env.NODE_ENV || 'production';

const config = {
  env         : ENV,
  isProduction: ENV === 'production',
  isDevelop   : ENV === 'develop',
  path        : pathSettings,
  package     : myPackage,
  get         : name => { return require('./' + name) },
};



module.exports = config;
