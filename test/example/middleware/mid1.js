// TODO: 需要支持直接的async函数
// module.exports = async (ctx, next) => { await next()};

// module.exports = async (ctx, next) => { await next()}
module.exports = () => {return async (ctx, next) => { await next()}}