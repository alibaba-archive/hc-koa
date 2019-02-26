'use strict';

/**
 * 此中间件挂载之后，req对象上将会增加一个方法 `req.csrfToken()`
 * 此方法用来获取 csrf token
 */
const _ = require('lodash');
const csrf = require('koa-csrf');

const defaultOptions = {
  /**
   * @param  {Request} ctx
   * @return {Boolean} true 表示跳过csrf校验, false 表示需要校验
   */
  ignore: function (ctx) {
    // 如果前端请求也伪造增加签名字段，auth中间件的校验是签名优先的，所以不会绕过去
    return !!ctx.headers.signature || !!ctx.headers.authorization;
  },
  cookie: true
};

module.exports = function (app, options) {
  let opts = _.merge({}, defaultOptions, options);
  let csrfCheck = new csrf(opts);
  return async function (ctx, next) {
    if (opts.ignore(ctx)) {
      return await next();
    } else {
      await csrfCheck(ctx, next);
    }
  };
};
