module.exports = (app, opt) => { return async (ctx, next) => { await next(); }; };
