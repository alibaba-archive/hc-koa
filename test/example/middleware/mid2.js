module.exports = (opt) => { return async (ctx, next) => { await next(); }; };
