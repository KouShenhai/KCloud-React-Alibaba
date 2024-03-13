// setupProxy.js文件中配置
//verion > 1.0
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
  }));

  app.use('/laokou', createProxyMiddleware({
    target: 'https://laokou.org.cn/',
    changeOrigin: true,
    // pathRewrite: { //路径替换
    //   '^/api2': '/api', // axios 访问/api2 == target + /api
    // }
  }));

};