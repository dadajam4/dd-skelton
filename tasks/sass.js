const config        = require('app-root-path').require('/config');
const path          = require('path');
const Notifier      = require('dd-notifier');
const gulp          = require('gulp');
const plumber       = require('gulp-plumber');
const gulpIf        = require('gulp-if');
const sass          = require('gulp-sass');
const postcss       = require('gulp-postcss');
const sourcemaps    = require('gulp-sourcemaps');
const rename        = require('gulp-rename');
const size          = require('gulp-size');
const chalk         = require('chalk');
const sassSettings  = require(path.join(config.path.config.css, 'sass-settings'));
const postcssConfig = require(path.join(config.path.config.css, 'postcss.config'));



function sassTask(task, params = {}) {
  return new Promise((resolve, reject) => {
    const ENTRY_PATH    = path.join(params.src, `${params.filename}.scss`),
          OUT_FILE_NAME = `${params.filename}.css`,
          OUT_PATH      = path.join(params.dest, OUT_FILE_NAME);

    const s = size({
      pretty   : true,
      showFiles: true,
      showTotal: false,
    });

    return gulp.src(ENTRY_PATH)
      .pipe(plumber())
      // .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
      .pipe(sourcemaps.init())
      .pipe(sass(sassSettings)
      .on('error', function(err) {
        if (task.notify) {
          new Notifier('danger', {
            subtitle: `${task.description}`,
            message : '失敗しました。',
          });
        }
        console.log(chalk.red(`${task.description} 失敗しました。`));
        sass.logError.bind(this)(err);
        reject(err);
      }))
      .pipe(postcss(postcssConfig.plugins, {

        // here in postcss options...
      }))
      .pipe(rename(OUT_FILE_NAME))
      .pipe(sourcemaps.write('.'))
      .pipe(s)
      .pipe(gulp.dest(params.dest))
      .on('end', function() {
        if (task.notify) {
          new Notifier('success', {
            subtitle: `${task.description}`,
            message : '完了しました。',
          });
        }
        console.log(chalk.green(`${task.description} 完了しました。`));
        resolve();
      });
  });
}



module.exports = sassTask;
