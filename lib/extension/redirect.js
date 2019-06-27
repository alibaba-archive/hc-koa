'use strict';
const Url = require('url');
const minimatch = require('minimatch');
/**
 * redirect白名单， 只支持白名单跳转
 * @param  {Response} app    [description]
 * @param  {Object} config
 *         - allowDomains {Array}
 * @return {[type]}        [description]
 *
 * TODO: 测试  `//` 开头的请求
 */
module.exports = function redirect(app, config) {
  let log = app.getLog();
  let ctx = app.koa.context;
  let domainGlobPatterns = '';
  if (config.allowDomains) {
    if (Array.isArray(config.allowDomains)) {
      if (config.allowDomains.length === 1) {
        domainGlobPatterns = config.allowDomains[0];
      } else {
        domainGlobPatterns = '{' + config.allowDomains.join(',') + '}';
      }
    } else if (typeof config.allowDomains === 'string') {
      domainGlobPatterns = config.allowDomains;
    }
  }
  let originRedirect = ctx.redirect;

  ctx.redirect = function (status, url) {
    if (url === undefined) {
      url = status;
      status = 302;
    }
    let tmp = url;
    if (tmp.startsWith('http:') || tmp.startsWith('https:')) {
      tmp = Url.parse(tmp);
      if (!minimatch(tmp.host, domainGlobPatterns) && this.host !== tmp.host) {
        log.error('ILLEGAL_HOST_REDIRECT', url);
        this.status = 403;
        return this.body = 'forbidden, stop redirecting to unknow host';
      }
    }
    // status no use
    originRedirect.call(this, url);
  };
};
