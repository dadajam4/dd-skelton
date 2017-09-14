const del   = require('del');
const chalk = require('chalk');



// @see: https://www.npmjs.com/package/del
function cleanTask(task, params = {}) {
  return new Promise((resolve, reject) => {
    const targets = typeof params.targets === 'string' ? [params.targets] : params.targets;
    del(targets, params.options).then(paths => {
      console.log(chalk.green(`${task.description} ファイルを削除しました。`));
      console.log(chalk.cyan(targets.join('\n')) + '\n');
      resolve();
    }).catch(reject);
  });
}



module.exports = cleanTask;
