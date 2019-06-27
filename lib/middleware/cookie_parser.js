'use strict';

const cookieParser = require('cookie-parser');

// koa使用cookie包，详情见npm cookies
// TODO: 加入更多的参数
module.exports = function (app, options) {
  app.keys = [options.secret];
  // return cookieParser(options.secret, options);
  return async function (ctx, next) { await next(); };
};
