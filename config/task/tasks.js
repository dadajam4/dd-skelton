const config         = require('app-root-path').require('/config');
const path           = require('path');
const publicSettings = require(path.join(config.path.config.dist, 'public-settings'));
const docsSettings   = require(path.join(config.path.config.dist, 'docs-settings'));



module.exports = {

  // public
  public: {
    name: '公開用ファイル',
    tasks: {
      clean: {
        type: 'clean',
        description: '[public] ファイルの削除',
        targets: path.join(config.path.public.root, '**', '*'),
      },
      img: {
        type: 'imagemin',
        description: '[public] 画像の圧縮',
        src: config.path.src.public.img,
        dest: config.path.public.assets.img,
        watch: config.path.src.public.img,
      },
      css: {
        type: 'css',
        description: '[public] cssのビルド',
        src: config.path.src.public.css,
        dest: config.path.public.assets.css,
        filename: publicSettings.css.name,
        watch: config.path.src.public.css,
      },
      sassValues: {
        type: 'sassValues',
        description: '[public] sass変数のビルド',
        src: path.join(config.path.src.constants.sass, 'sass-variables'),
        dest: config.path.src.tmp.sass,
        watch: config.path.src.constants.sass,
      },
      sprite: {
        type: 'sprite',
        description: '[public] スプライト画像のビルド',
        src: config.path.src.public.sprite,
        dest: config.path.public.assets.sprite,
        spriteName: `${publicSettings.css.name}-sprite`,
        suffix: `${publicSettings.css.suffix}sprite-`,
        // imgDir: path.join(config.path.public.assets.css, '..', config.path.public.assets.$names.sprite),
        imgDir: path.join('..', config.path.public.assets.$names.sprite),
        watch: config.path.src.public.sprite,
      },
      svgIcon: {
        type: 'svgIcon',
        description: '[public] SVGアイコンのビルド',
        src: config.path.src.public.svgIcon,
        dest: path.join(config.path.public.assets.font, `${publicSettings.css.suffix}icon`),
        watch: config.path.src.public.svgFont,
        fontName: `${publicSettings.css.suffix}icon`,
        fontDir: path.join('..', config.path.public.assets.$names.font, `${publicSettings.css.suffix}icon`),
      },
      js: {
        type: 'js',
        description: '[public] jsのビルド',
        src: config.path.src.public.js,
        dest: config.path.public.assets.js,
        opts: publicSettings.js,
        watch: true,
      },
      html: {
        type: 'ejs',
        description: '[public] htmlのビルド',
        src: config.path.src.public.html,
        dest: config.path.public.root,
        watch: config.path.src.public.html,
      },
      files: {
        type: 'sync',
        description: '[public] ファイルの同期',
        src: config.path.src.public.files,
        dest: config.path.public.root,
        watch: config.path.src.public.files,
      },
    },
  }, // End public

  // docs
  docs: {
    name: 'ドキュメント',
    tasks: {
      syncPublicAssets: {
        type: 'sync',
        description: '[docs] 公開用アセットの同期',
        src: config.path.public.root,
        dest: path.join(config.path.docs.root, config.path.public.$names.root),
        exclude: ['*'],
        include: [
          `${config.path.public.assets.$names.root}/***`,
          `${config.path.public.assets.$names.root}/`,
        ],
        watch: config.path.public.root,
      },
      clean: {
        type: 'clean',
        description: '[docs] ファイルの削除',
        targets: path.join(config.path.docs.root, '**', '*'),
      },
      img: {
        type: 'imagemin',
        description: '[docs] 画像の圧縮',
        src: config.path.src.docs.img,
        dest: config.path.docs.assets.img,
        watch: config.path.src.docs.img,
      },
      css: {
        type: 'css',
        description: '[docs] cssのビルド',
        src: config.path.src.docs.css,
        dest: config.path.docs.assets.css,
        filename: docsSettings.css.name,
        watch: config.path.src.docs.css,
      },
      js: {
        type: 'js',
        description: '[docs] jsのビルド',
        src: config.path.src.docs.js,
        dest: config.path.docs.assets.js,
        opts: docsSettings.js,
        src: true,
      },
      html: {
        type: 'ejs',
        description: '[docs] htmlのビルド',
        src: config.path.src.docs.html,
        dest: config.path.docs.root,
        watch: config.path.src.docs.html,
      },
      routings: {
        type: 'routings',
        description: '[docs] ルーティング',
        src: path.join(config.path.src.docs.js, 'pages'),
        dest: config.path.src.tmp.root,
        filename: 'docs-routings',
        importRoot: config.path.src.root,
        html: {
          dest: config.path.docs.root,
          template: path.join(config.path.src.docs.html, 'index.ejs'),
        },
      },
      files: {
        type: 'sync',
        description: '[docs] ファイルの同期',
        src: config.path.src.docs.files,
        dest: config.path.docs.root,
        watch: config.path.src.docs.files,
      },
    },
  }, // End docs
}
