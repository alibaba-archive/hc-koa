'use strict';

module.exports = (opt) => {
  async function Mid5(ctx, next) {
    ctx.response.write(opt.overwrite || 'mid5Default');
    next();
  };

  Mid5.match = function (ctx) {
    return ctx.url.indexOf('switchMid=mid5') !== -1;
  };

  return Mid5;
};
