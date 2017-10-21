const config     = require('app-root-path').require('/config');
const path       = require('path');
const fs         = require('fs');
const jsImporter = require('node-sass-js-importer');
const Notifier   = require('dd-notifier');
const chalk      = require('chalk');
const mkdirp     = require('mkdirp');



function sassValuesTask(task, params = {}) {
  return new Promise((resolve, reject) => {
    try {
      let targets = params.src;
      targets = typeof targets === 'string' ? [targets] : targets;

      const promiseList = [];

      mkdirp.sync(params.dest);

      targets.forEach(target => {
        const pathInfo = path.parse(target),
              filename = pathInfo.name,
              outpath  = path.join(params.dest, `${filename}.scss`),
              data     = require(target),
              parsed   = jsImporter.transformJSONtoSass(data);

        delete require.cache[target];

        promiseList.push(new Promise((resolve, reject) => {
          fs.writeFile(outpath, parsed, 'utf-8', err => {
            if (err) return reject(err);
            console.log(chalk.cyan(`sass value >>> ${outpath}`));
            resolve();
          });
        }));
      });

      Promise.all(promiseList)
        .then(() => {
          if (task.notify) {
            new Notifier('success', {
              subtitle: `${task.description}`,
              message : '完了しました。',
            });
          }
          console.log(chalk.green(`${task.description} 完了しました。`));
          resolve();
        })
        .catch(e => {
          throw new Error(e);
        });
    } catch(e) {
      if (task.notify) {
        new Notifier('danger', {
          subtitle: `${task.description}`,
          message : '失敗しました。',
        });
      }
      console.log(chalk.red(`${task.description} 失敗しました。`));
      console.error(e);
    }
  });
}



module.exports = sassValuesTask;
