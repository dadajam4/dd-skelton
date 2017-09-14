const config        = require('app-root-path').require('/config');
const path          = require('path');
const DDTaskManager = require(path.join(config.path.lib.root, 'dd-task-manager'));
const taskSettings  = require(path.join(config.path.config.task, 'task-settings'));



const argv = require('minimist')(process.argv.slice(2));
const flow = argv.f;
if (!flow) throw new Error('flowが指定されていません。 -f [flow] で指定してください。');

const taskManager = new DDTaskManager(taskSettings, {
  rootDir: config.path.tasks.root,
  watch  : argv.watch,
  notify : {flow: true, task: true},
});
taskManager.flow(flow);

