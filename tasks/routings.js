const mkdirp   = require('mkdirp');
const ejs      = require('ejs');
const fs       = require('fs');
const path     = require('path');
const beautify = require('js-beautify');
const FileUtil = require('dd-file-util');
const Notifier = require('dd-notifier');
const chalk    = require('chalk');



// @see: https://www.npmjs.com/package/ejs
function routingsTask(task, params = {}) {
  return new Promise((resolve, reject) => {
    try {
      const pathList = FileUtil.getPathList(params.src);
      const defaultOptions = {
        cacheBuster: new Date().getTime(),
      };

      const routings = [];
      pathList.forEach(define => {
        const filename      = define.filename.replace(/\.vue$/, '');
        const dirName       = filename === 'index' ? define.dir : path.join(define.dir, filename);
        const relativeBase  = dirName.replace(new RegExp('^' + params.src.replace(/\//g, '\/') + '\/?'), '');
        const dirNames      = relativeBase.split('/');
        const relativeLevel = dirNames[0] ? dirNames.length : 0;
        const name          = dirNames.reduce((prev, current) => prev + '-' + current) || 'index';
        const myPath        = '/' + dirNames.join('/');
        const componentPath = define.filepath.replace(new RegExp('^' + params.importRoot.replace(/\//g, '\/')), '').replace(/^\//, '').replace(/\.vue$/, '');
        const parent        = relativeLevel > 0 ? name.replace(/-((?!-).)+$/, '') : null;

        const routing = {
          _level: relativeLevel,
          _filename: filename,
          _component: componentPath,
          _parent: parent,
          name: name,
          path: myPath,
        };

        routings.push(routing);
      });

      routings.sort((a, b) => {
        if (b._filename === 'index') return 1;
        return b._filename < a._filename;
      });
      routings.sort((a, b) => a._level > b._level);

      const createComponentSettingString = `
        const createComponentSetting = (component) => {
          return {
            component: component,
            // loading: LoadingComponent,
            // error: ErrorComponent,
            delay: 200,
            timeout: 3000,
          }
        }
      `;

      let htmlTemplate;
      if (params.html) {
        htmlTemplate = fs.readFileSync(params.html.template, 'utf-8');
      }

      const rowStrings = [];

      routings.forEach(routing => {
        const createComponentString = `() => (Object.assign(, {component: }))`
        const rowString = `{
          _level: ${routing._level},
          _filename: '${routing._filename}',
          _component: '${routing._component}',
          _parent: ${routing._parent ? '\'' + routing._parent + '\'' : 'null' },
          name: '${routing.name}',
          path: '${routing.path}',
          component: () => createComponentSetting(import(/* webpackChunkName: "${('pages/' + routing.path + '/index').replace(/\/+/, '/')}" */ '${routing._component}'))
        }`;
        rowStrings.push(rowString);

        if (params.html) {
          const htmlOptions = Object.assign({
            baseUri: routing._level === 0 ? './' : '../'.repeat(routing._level),
          }, defaultOptions, params.html.options);
          const htmlDestDir = path.join(params.html.dest, routing.path);
          const htmlData    = ejs.render(htmlTemplate, htmlOptions);
          mkdirp.sync(htmlDestDir);
          fs.writeFileSync(path.join(htmlDestDir, 'index.html'), htmlData);
        }

        // for (let key in routing) {
        //   if (key.indexOf('_') === 0) delete routing[key];
        // }
      });

      const jsString = beautify(`
        ${createComponentSettingString}

        const router = {
          mode: 'history',
          fallback: false,
          routes: [
            ${rowStrings.join(',\n')}
          ],
        };

        export default router;
      `, { indent_size: 2 });

      mkdirp.sync(params.dest);
      const outPath = path.join(params.dest, `${params.filename}.js`);
      fs.writeFileSync(outPath, jsString);

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



module.exports = routingsTask;
