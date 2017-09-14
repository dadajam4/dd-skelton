const config   = require('../config');
const path     = require('path');
const FileUtil = require('dd-file-util');

let CONFIG_PATH = path.join(config.path.config.server, 'server-settings.js');
if (!FileUtil.isExistFile(CONFIG_PATH)) {
  CONFIG_PATH = path.join(config.path.config.server, 'server-settings.default.js');
}

const serverSettings = require(CONFIG_PATH);
const AbstractServer = require('./AbstractServer');



const argv   = require('minimist')(process.argv.slice(2));
const target = argv.t;
if (!target) throw new Error('サーバーターゲットが指定されていません。 -t [ターゲット] で指定してください。');
const define = Object.assign({}, {name: target}, serverSettings[target]);

if (!define) throw new Error(`サーバーターゲット ${target} は未定義です。`);

const server     = new AbstractServer(define);
const routesPath = path.join(__dirname, target, 'routes');
if (FileUtil.isDir(routesPath)) {
  server.setRoutes(routesPath);
}

server.run();
