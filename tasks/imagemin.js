const config           = require('app-root-path').require('/config');
const path             = require('path');
const gulp             = require('gulp');
const plumber          = require('gulp-plumber');
const imagemin         = require('gulp-imagemin');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const Notifier         = require('dd-notifier');
const chalk            = require('chalk');



function imageminTask(task, params = {}) {
  return new Promise((resolve, reject) => {
    gulp.src(path.join(params.src, '**', '*'))
      .pipe(plumber())
      .pipe(imagemin([

        // jpeg
        imageminMozjpeg({
          quality: 80,
          // progressive: true,
          // targa: true,
        }),

        // png
        imageminPngquant({
          // quality: '65-80',
        }),

        // gif
        imagemin.gifsicle({interlaced: true}),

        // svg
        imagemin.svgo({plugins: [{removeViewBox: true}]}),
      ]))
      .on('error', function(err) {
        if (task.notify) {
          new Notifier('danger', {
            subtitle: `${task.description}`,
            message : '失敗しました。',
          });
        }

        console.log(chalk.red(`${task.description} 失敗しました`));
        console.log(err);
        reject(err);
      })
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



module.exports = imageminTask;
