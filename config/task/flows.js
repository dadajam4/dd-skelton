module.exports = {

  // develop
  develop: {
    tasks: [
      'public.sprite',
      'public.img',
      'public.svgIcon',
      'public.files',
      'public.html',
      'public.sassValues',
    ],
    child: {
      tasks: [
        'public.css',
        'public.js',
      ],
      child: {
        tasks: [
          'docs.img',
          'docs.files',
          // 'docs.html',
          'docs.routings',
        ],
        child: {
          tasks: [
            'docs.css',
            'docs.js',
          ],
        },
      },
    },
  }, // End develop

  // build
  build: {
    tasks: [
      'public.clean',
      'docs.clean',
    ],
    child: {
      tasks: [
        'public.sprite',
        'public.img',
        'public.svgIcon',
        'public.files',
        'public.html',
        'public.sassValues',
      ],
      child: {
        tasks: [
          'public.css',
          'public.js',
        ],
        child: {
          tasks: [
            'docs.syncPublicAssets',
            'docs.img',
            'docs.files',
            // 'docs.html',
            'docs.routings',
          ],
          child: {
            tasks: [
              'docs.css',
              'docs.js',
            ],
          },
        },
      },
    },
  }, // End build
}
