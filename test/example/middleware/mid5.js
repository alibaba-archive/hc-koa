'use strict';

module.exports = (opt) => {
  async function Mid5(ctx, next) {
    ctx.body = opt.overwrite || 'mid5Default';
    await next();
  }

  Mid5.match = function (ctx) {
    return ctx.url.indexOf('switchMid=mid5') !== -1;
  };

  return Mid5;
};
