const express            = require('express');
const proxy              = require('express-http-proxy');
const url                = require('url');
const bodyParser         = require('body-parser');
const os                 = require('os');
const chalk              = require('chalk');
const FileUtil           = require('dd-file-util');
const historyApiFallback = require('connect-history-api-fallback');



class AbstractServer {



  /**
   * constructor
   */
  constructor(define) {
    this.name               = define.name || 'server';
    this.port               = define.port;
    this.node               = express();
    this.static             = define.static ? define.static : {};
    this.proxy              = define.proxy  ? define.proxy  : [];
    this.historyApiFallback = define.historyApiFallback;

    if (this.historyApiFallback) {
      this.node.use(historyApiFallback(
        Object.assign({
          index: '/index.html',
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
        }, this.historyApiFallback)
      ));
    }

    // Setup Plugins
    this.node.use(bodyParser.urlencoded({
      extended: true,
    }));
    this.node.use(bodyParser.json({limit: '5mb'}));
    this.node.use(bodyParser.urlencoded({limit:'50mb', extended: true}));

    for (const uri in this.static) {
      const targetPath = this.static[uri];
      this.node.use(uri, express.static(targetPath));
    }


    this.proxy.forEach(row => {
      this.node.use(row.from, proxy(row.to, {
        proxyReqPathResolver: row.proxyReqPathResolver,
          // forwardPath: function(req, res) {
          //   console.log(row.from + url.parse(req.url).path);
          //   return row.from + url.parse(req.url).path;
          // },
          // decorateRequest: function (proxyReq, originalReq) {
          //   proxyReq.headers['Authorization'] = 'Basic ' + config.proxyAuth;
          //   if (originalReq.body) {
          //     proxyReq.bodyContent = JSON.stringify(originalReq.body);
          //   }
          //   return proxyReq;
          // }
        })
      );
    });
  }



  /**
   * run
   */
  run() {
    this.node.listen(this.port);
    console.log(chalk.green(`[${this.name}] launched -> http://localhost:${this.port}   http://${getLocalIpAddress()}:${this.port}`));
  }



  /**
   * Set Routings
   */
  setRoutes(rootPath) {
    const pathList = FileUtil.getPathList(rootPath);
    pathList.forEach(pathInfo => {
      const location = pathInfo.dir.replace(new RegExp('^' + rootPath), '').replace(/\[(.*?)\]/g, ':$1');
      const data     = require(pathInfo.filepath);
      delete require.cache[pathInfo.filepath];

      for (let method in data) {
        this.node[method](location, data[method]);
      }
    });
  }
}



// local IP取得
function getLocalIpAddress() {
  let ipAddress;

  const ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(ifname => {
    ifaces[ifname].forEach(iface => {

      if ('IPv4' !== iface.family || iface.internal !== false) {

        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      // en0 192.168.1.NNN
      ipAddress = iface.address;
    });
  });
  return ipAddress;
}



module.exports = AbstractServer;
