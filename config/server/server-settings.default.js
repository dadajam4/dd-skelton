const config = require('app-root-path').require('/config');



const serverSettings = {
  public: {
    port  : 3000,
    static: {
      '/': config.path.public.root,
    },
  },
  docs: {
    port  : 4000,
    static: {
      '/': config.path.docs.root,
    },
  },
};



if (config.isDevelop) {
  serverSettings.docs.proxy = [
    {
      from: '/public',
      to: `http://localhost:${serverSettings.public.port}`,
      proxyReqPathResolver: function(req, res) {
        return req.url;
      },
    }
  ];
} else {
  serverSettings.docs.static['/public/assets'] = config.path.public.assets.root;
}



module.exports = serverSettings;
