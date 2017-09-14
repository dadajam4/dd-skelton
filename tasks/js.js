const config   = require('app-root-path').require('/config');
const path     = require('path');
const chalk    = require('chalk');
const webpack  = require('webpack');
const Notifier = require('dd-notifier');



function jsTask(task, params) {
  return new Promise((resolve, reject) => {
    const webpackConfig = require(path.join(config.path.config.webpack, `webpack.${config.env}.conf`));

    webpackConfig.entry       = params.opts.entry;
    webpackConfig.output.path = params.opts.outputPath;

    if (params.opts.modules) {
      webpackConfig.resolve.modules = [
        ...params.opts.modules,
        ...webpackConfig.resolve.modules,
      ];
    }

    if (task.watch) {
      webpackConfig.cache = true;
      webpackConfig.watch = true;
    }

    webpack(webpackConfig, function(err, stats) {
      const jsonStats = stats.toJson();

      if (jsonStats.errors.length > 0) {
        jsonStats.errors.forEach((error, i) => {
          console.log(chalk.red.bold(`[${i}] >>> ${error}`));
        });

        if (task.notify) {
          new Notifier('danger', {
            subtitle: `${task.description}`,
            message : '失敗しました。',
          });
        }
        return;
      }

      if (jsonStats.warnings.length > 0) {
        jsonStats.warnings.forEach((warning, i) => {
          console.log(chalk.yellow.bold(`[${i}] >>> ${warning}`));
        });
      }

      if (err) return reject(err);

      const hasEmited = jsonStats.assets.find(asset => { return asset.emitted }) !== undefined;
      if (!hasEmited) return;

      let hasBuilted = false;
      for (let i = 0, l = jsonStats.chunks.length; i < l; i++) {
        const chunk = jsonStats.chunks[i];
        for (let ii = 0, ll = chunk.modules.length; ii < ll; ii++) {
          const module = chunk.modules[ii];
          if (module.built && !/^\.\/node_modules\/css\-loader/.test(module.name)) {
            hasBuilted = true;
            break;
          }
        }
        if (hasBuilted) break;
      }
      if (!hasBuilted) return;

      process.stdout.write(stats.toString({
        colors      : true,
        modules     : false,
        children    : false,
        chunks      : false,
        chunkModules: false,
      }) + '\n\n');

      if (task.notify) {
        new Notifier('success', {
          subtitle: `${task.description}`,
          message : '完了しました。',
        });
      }

      console.log(chalk.green(`${task.description} 完了しました。` + '\n'));
      resolve({skipWatch: true});
    });
  });
}



module.exports = jsTask;
