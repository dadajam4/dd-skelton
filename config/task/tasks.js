const config         = require('app-root-path').require('/config');
const path           = require('path');
const publicSettings = require(path.join(config.path.config.dist, 'public-settings'));
// const docsSettings   = require(path.join(config.path.config.dist, 'docs-settings'));



module.exports = {

  // ui
  ui: {
    name: 'UI',
    tasks: {
      clean: {
        type: 'clean',
        description: '[ui] ファイルの削除',
        targets: path.join(config.path.plugins.ui, 'dist', '**', '*'),
      },
      svgIcon: {
        type: 'svgIcon',
        description: '[ui] SVGアイコンのビルド',
        src: path.join(config.path.plugins.ui, 'assets', 'svg-icon'),
        watch: path.join(config.path.plugins.ui, 'assets', 'svg-icon'),
        dest: path.join(config.path.plugins.ui, 'dist', 'font', `${publicSettings.css.prefix}icon`),
        sassDest: path.join(config.path.plugins.ui, 'sass', '.tmp'),
        fontName: `${publicSettings.css.prefix}icon`,
        template: path.join(config.path.plugins.ui, 'config', 'svg', 'svg-icon-template.scss'),
        fontDir: path.join('..', config.path.public.assets.$names.font, `${publicSettings.css.prefix}icon`),
      },
      sassValues: {
        type: 'sassValues',
        description: '[ui] sass変数のビルド',
        src: path.join(config.path.plugins.ui, 'constants', 'sass', 'sass-variables.js'),
        dest: path.join(config.path.plugins.ui, 'sass', '.tmp'),
        watch: path.join(config.path.plugins.ui, 'constants', 'sass'),
      },
      sync: {
        type: 'sync',
        description: '[ui] ファイルの同期',
        src: path.join(config.path.plugins.ui, 'dist', 'font'),
        dest: path.join(config.path.assets.root, 'font'),
        watch: path.join(config.path.plugins.ui, 'dist', 'font'),
      },
      // sass: {
      //   type: 'sass',
      //   description: '[public] sassのビルド',
      //   src: path.join(config.path.plugins.ui, 'sass'),
      //   dest: path.join(config.path.plugins.ui, 'dist', 'css'),
      //   filename: publicSettings.css.name,
      //   watch: path.join(config.path.plugins.ui, 'sass'),
      // },
    },
  },

  // // public
  // public: {
  //   name: '公開用ファイル',
  //   tasks: {
  //     clean: {
  //       type: 'clean',
  //       description: '[public] ファイルの削除',
  //       targets: path.join(config.path.public.root, '**', '*'),
  //     },
  //     img: {
  //       type: 'imagemin',
  //       description: '[public] 画像の圧縮',
  //       src: config.path.src.img,
  //       dest: config.path.public.assets.img,
  //       watch: config.path.src.img,
  //     },
  //     sassValues: {
  //       type: 'sassValues',
  //       description: '[public] sass変数のビルド',
  //       src: path.join(config.path.src.constants.sass, 'sass-variables'),
  //       dest: config.path.src.tmp.sass,
  //       watch: config.path.src.constants.sass,
  //     },
  //     sprite: {
  //       type: 'sprite',
  //       description: '[public] スプライト画像のビルド',
  //       src: config.path.src.sprite,
  //       dest: config.path.public.assets.sprite,
  //       spriteName: `${publicSettings.css.name}-sprite`,
  //       prefix: `${publicSettings.css.prefix}sprite-`,
  //       // imgDir: path.join(config.path.public.assets.css, '..', config.path.public.assets.$names.sprite),
  //       imgDir: path.join('..', config.path.public.assets.$names.sprite),
  //       watch: config.path.src.sprite,
  //     },
  //     svgIcon: {
  //       type: 'svgIcon',
  //       description: '[public] SVGアイコンのビルド',
  //       src: config.path.src.svgIcon,
  //       dest: path.join(config.path.public.assets.font, `${publicSettings.css.prefix}icon`),
  //       watch: config.path.src.svgFont,
  //       fontName: `${publicSettings.css.prefix}icon`,
  //       fontDir: path.join('..', config.path.public.assets.$names.font, `${publicSettings.css.prefix}icon`),
  //     },
  //     css: {
  //       type: 'css',
  //       description: '[public] cssのビルド',
  //       src: config.path.src.css,
  //       dest: config.path.public.assets.css,
  //       filename: publicSettings.css.name,
  //       watch: config.path.src.css,
  //     },
  //     webpack: {
  //       type: 'webpack',
  //       description: '[public] webpack',
  //       src: config.path.src.js,
  //       dest: config.path.public.assets.js,
  //       opts: publicSettings.js,
  //       watch: true,
  //     },
  //     // html: {
  //     //   type: 'ejs',
  //     //   description: '[public] htmlのビルド',
  //     //   src: config.path.src.html,
  //     //   dest: config.path.public.root,
  //     //   watch: config.path.src.html,
  //     // },
  //     routings: {
  //       type: 'routings',
  //       description: '[public] ルーティング',
  //       src: path.join(config.path.src.js, 'pages'),
  //       dest: config.path.src.tmp.root,
  //       filename: 'public-routings',
  //       importRoot: config.path.src.root,
  //       watch: [
  //         config.path.src.html,
  //         // path.join(config.path.src.docs.js, 'pages'),
  //       ],
  //       html: {
  //         dest: config.path.public.root,
  //         template: path.join(config.path.src.html, 'index.ejs'),
  //       },
  //     },
  //     files: {
  //       type: 'sync',
  //       description: '[public] ファイルの同期',
  //       src: config.path.src.files,
  //       dest: config.path.public.root,
  //       watch: config.path.src.files,
  //     },
  //   },
  // }, // End public

  // // docs
  // docs: {
  //   name: 'ドキュメント',
  //   tasks: {
  //     syncPublicAssets: {
  //       type: 'sync',
  //       description: '[docs] 公開用アセットの同期',
  //       src: config.path.public.root,
  //       dest: path.join(config.path.docs.root, config.path.public.$names.root),
  //       exclude: ['*'],
  //       include: [
  //         `${config.path.public.assets.$names.root}/***`,
  //         `${config.path.public.assets.$names.root}/`,
  //       ],
  //       watch: config.path.public.root,
  //     },
  //     clean: {
  //       type: 'clean',
  //       description: '[docs] ファイルの削除',
  //       targets: path.join(config.path.docs.root, '**', '*'),
  //     },
  //     img: {
  //       type: 'imagemin',
  //       description: '[docs] 画像の圧縮',
  //       src: config.path.src.docs.img,
  //       dest: config.path.docs.assets.img,
  //       watch: config.path.src.docs.img,
  //     },
  //     css: {
  //       type: 'css',
  //       description: '[docs] cssのビルド',
  //       src: config.path.src.docs.css,
  //       dest: config.path.docs.assets.css,
  //       filename: docsSettings.css.name,
  //       watch: config.path.src.docs.css,
  //     },
  //     js: {
  //       type: 'js',
  //       description: '[docs] jsのビルド',
  //       src: config.path.src.docs.js,
  //       dest: config.path.docs.assets.js,
  //       opts: docsSettings.js,
  //       src: true,
  //     },
  //     html: {
  //       type: 'ejs',
  //       description: '[docs] htmlのビルド',
  //       src: config.path.src.docs.html,
  //       dest: config.path.docs.root,
  //       watch: config.path.src.docs.html,
  //     },
  //     files: {
  //       type: 'sync',
  //       description: '[docs] ファイルの同期',
  //       src: config.path.src.docs.files,
  //       dest: config.path.docs.root,
  //       watch: config.path.src.docs.files,
  //     },
  //   },
  // }, // End docs
}
