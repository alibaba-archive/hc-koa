'use strict';

module.exports = (opt) => {
  async function Mid4(ctx, next) {
    // ctx.res.write(opt.overwrite || 'mid4Default');
    ctx.body = opt.overwrite || 'mid4Default';
    await next();
  }

  Mid4.match = function (ctx) {
    return ctx.url.indexOf('switchMid=mid4') !== -1;
  };

  return Mid4;
};
