const config   = require('app-root-path').require('/config');
const gulp     = require('gulp');
const path     = require('path');
const rsync    = require("rsyncwrapper");
const Notifier = require('dd-notifier');
const chalk    = require('chalk');



function syncTask(task, params = {}) {
  return new Promise((resolve, reject) => {
    const opts = {
      src      : params.src + '/',
      dest     : params.dest,
      recursive: true,
    };

    ['include', 'exclude', 'excludeFirst'].forEach(key => {
      if (params[key]) {
        opts[key] = params[key];
      }
    });

    rsync(opts, function(error, stdout, stderr, cmd) {
      if (error) {
        if (task.notify) {
          new Notifier('danger', {
            subtitle: `${task.description}`,
            message : '失敗しました。',
          });
        }
        console.log(chalk.red(`${task.description} 失敗しました。`));
        console.log(error.message);
        reject(error);
      } else {
        if (task.notify) {
          new Notifier('success', {
            subtitle: `${task.description}`,
            message : '完了しました。',
          });
        }
        console.log(chalk.green(`${task.description} 完了しました。`));
        resolve();
      }
    });
  });
}



module.exports = syncTask;
