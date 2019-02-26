'use strict';

module.exports = (opt) => {
  async function Mid6(ctx, next) {
    ctx.response.write(opt.overwrite || 'mid6Default');
    next();
  };

  Mid6.match = function (ctx) {
    return ctx.url.indexOf('switchMid=mid6') !== -1;
  };

  return Mid6;
};
