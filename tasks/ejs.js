const mkdirp   = require('mkdirp');
const ejs      = require('ejs');
const fs       = require('fs');
const path     = require('path');
const FileUtil = require('dd-file-util');
const Notifier = require('dd-notifier');
const chalk    = require('chalk');



// @see: https://www.npmjs.com/package/ejs
function ejsTask(task, params = {}) {
  return new Promise((resolve, reject) => {
    try {
      const pathList = FileUtil.getPathList(params.src);
      const defaultOptions = {
        cacheBuster: new Date().getTime(),
      };
      const options = Object.assign({}, defaultOptions, params.options);

      pathList.forEach(item => {
        let template = fs.readFileSync(item.filepath, 'utf-8'),
            outData  = ejs.render(template, options),
            outDir   = path.join(params.dest, item.dir.replace(new RegExp('^' + params.src), '')),
            outPath  = path.join(outDir, item.filename.replace(/\.ejs$/, '.html'));

        mkdirp.sync(outDir);
        fs.writeFileSync(outPath, outData);
      });

      if (task.notify) {
        new Notifier('success', {
          subtitle: `${task.description}`,
          message : '完了しました。',
        });
      }
      console.log(chalk.green(`${task.description} 完了しました。`));
      resolve();
    } catch(e) {
      if (task.notify) {
        new Notifier('danger', {
          subtitle: `${task.description}`,
          message : '失敗しました。',
        });
      }

      console.log(chalk.red(`${task.description} 失敗しました。`));
      console.log(e);
      reject(e);
    }
  });
}



module.exports = ejsTask;
