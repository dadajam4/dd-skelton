const config      = require('app-root-path').require('/config');
const gulp        = require('gulp');
const plumber     = require('gulp-plumber');
const path        = require('path');
const buffer      = require('vinyl-buffer');
const es          = require('event-stream');
const imagemin    = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const Notifier    = require('dd-notifier');
const chalk       = require('chalk');



function spriteTask(task, params = {}) {
  return new Promise((resolve, reject) => {
    const IMG_FILE_NAME        = `${params.spriteName}.png`;
    const RETINA_IMG_FILE_NAME = `${params.spriteName}@2x.png`;
    const SCSS_FILE_NAME       = `${params.spriteName}.scss`;

    const spriteData = gulp.src(path.join(params.src, '**', '*.png'))
      .pipe(plumber())
      .pipe(spritesmith({
        imgName        : IMG_FILE_NAME,
        cssName        : SCSS_FILE_NAME,
        imgPath        : path.join(params.imgDir, IMG_FILE_NAME),
        padding        : 2,
        retinaSrcFilter: path.join(params.src, '**', '*@2x.png'),
        retinaImgName  : RETINA_IMG_FILE_NAME,
        retinaImgPath  : path.join(params.imgDir, RETINA_IMG_FILE_NAME),
        // cssFormat      : 'scss', // ※これ指定するとretina用のmixinが生成されない

        cssVarMap: sprite => {
          sprite.name = `${params.prefix}-${sprite.name}`;
        },
      }));

    const imgStream = spriteData.img;
    const cssStream = spriteData.css;

    es.concat(
      imgStream
        .pipe(plumber())
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest(params.dest))
        .on('end', function() {
          console.log(chalk.cyan(`sprite img >>> ${path.join(params.dest, IMG_FILE_NAME)}`));
        }),
      cssStream
        .pipe(plumber())
        .pipe(gulp.dest(config.path.src.tmp.sass))
        .on('end', function() {
          console.log(chalk.cyan(`sprite css >>> ${path.join(config.path.src.tmp.sass, SCSS_FILE_NAME)}`));
        })
    ).on('end', function() {
      if (task.notify) {
        new Notifier('success', {
          subtitle: `${task.description}`,
          message : '完了しました。',
        });
      }
      console.log(chalk.green(`${task.description} 完了しました。`));
      resolve();
    }).on('error', function(err) {
      if (task.notify) {
        new Notifier('danger', {
          subtitle: `${task.description}`,
          message : '失敗しました。',
        });
      }

      console.log(chalk.red(`${task.description} 失敗しました。`));
      console.log(err);

      reject(err);
    });
  });
}



module.exports = spriteTask;
