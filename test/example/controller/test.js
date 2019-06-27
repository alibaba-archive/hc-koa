'use strict';

const log = require('../common/log');
const urllib = require('urllib');

function* test() {
  let p = new Promise(function (resolve) {
    setTimeout(function () {
      resolve('hello');
    }, 1000);
  });
  return yield p;
}
/**
 * @api /test
 */
exports.test = async function (ctx) {
  log.info('test for log instance is ok');
  ctx.body = 'Hello World';
};

/**
 * @api /hi/
 */
exports.hi = async function (ctx) {
  log.info('test for log instance is ok');
  ctx.body = 'hi test';
};
/**
 * @api /ctrl
 */
exports.ctrl = function (ctx) {
  ctx.json({
    ok: 1
  });
};

/**
 *  /genCtrl
 */
// exports.genCtrl = function* (req) {
//   let v = yield test;
//   let query = req.query;
//   switch (query.test) {
//     case 'error':
//       return new Error('error_message');
//     case 'object_return':
//       return {hello: v};
//     default:
//       return [null, {hello: v}];
//   }
// };

/**
 * @api /error
 */
exports.error = function (req, callback) {
  process.emit('error', 'mock_error');
};

/**
 *
 * @api /timeout
 */
exports.timeout = async function (ctx) {
  await new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
  ctx.body = 'hello';
};


/**
 * @api /time
 */
exports.time =  async function (ctx) {
  let p = new Promise(function (ok, err) {
    setTimeout(function () {
      ok();
    }, 100);
  });
  let fn = () => { return p; };
  ctx.time('haha');
  await fn();
  ctx.timeEnd('haha');
  ctx.json('ok');
};


/**
 * @api /error_generator
 */
exports.error_generator = function () {
  throw new Error('test_error');
};

/**
 * @api /log_trace_id
 */
exports.log_trace_id = function (ctx) {
  ctx.log.info('test for log trace id');
  ctx.json('hello');
};

/**
 * @api /exception
 */
exports.exception = function () {
  throw new Error(500, 'custom controller exception for test');
};

/**
 * @api /callback_error
 */
exports.callbackError = function (ctx) {
  ctx.throw(500, 'custom_error');
};

/**
 * @api /callback_error_403
 */
exports.callbackError403 = function (ctx) {
  ctx.throw(403);
};

/**
 * @api /callback_error_err
 */
exports.callbackErrorErr = function (ctx) {
  ctx.throw(new Error('custom_error'));
};

/**
 * @api /callback_error_404
 */
exports.callbackError404 = function (ctx) {
  ctx.throw(404, 'NOT FOUND');
};

/**
 * @api /callback_error_throw
 */
exports.callbackErrorThrow = function (ctx) {
  ctx.throw('custom_error');
};


/**
 * @api /test_async_func1/:status
 */
exports.asyncfn1 = async function (ctx) {
  let status = ctx.params.status;
  if (status === 'ok') {
    ctx.json('ok');
  } else if (status === 'error') {
    throw new Error('async_error');
  }
};

/**
 * @api /test_async_func2/:status
 */
exports.asyncfn2 = async function (ctx) {
  let status = ctx.params.status;
  if (status === 'ok') {
    ctx.json('ok');
  } else if (status === 'error') {
    throw new Error('async_error');
  }
};
/**
 * @api /test_async_func3/:status
 */
exports.asyncfn3 = async function (req, res, next) {
  let status = req.params.status;
  if (status === 'ok') {
    res.end('ok');
  } else if (status === 'error') {
    throw new Error('async_error');
  }
};

/**
 * @api /test_combine1
 * @nowrap
 */
exports.combine1 = function (ctx) {
  if (ctx.body)
    ctx.body += ' testCombine1';
  else
    ctx.body = ' testCombine1';
};

/**
 * @api /test_combine2
 * @nowrap
 */
exports.combine2 = function (ctx) {
  ctx.body += ' testCombine2';
};

/**
 * @api /test_combine3
 * @nowrap
 */
exports.combine3 = function (ctx) {
  ctx.body += ' testCombine3';
};

/**
 * @api /testCreated
 * @nowrap
 */
exports.testCreated = function (ctx) {
  ctx.status = 201;
  ctx.body = 'created';
};


async function request(url, ctx) {
  return new Promise((resolve, reject) => {
    urllib.request(url, {
      streaming: true,
      stream: ctx.req
    }, function (err, data, res) {
      if (err) return reject(err);
      resolve(res);
    });
  });
}
/**
 * @api /testProxyStatusCode201
 */
exports.testProxyStatusCode201 = async function (ctx) {
  let res = await request('http://localhost:12345/test/testCreated', ctx);
  this.body = 'aaa';
  // urllib.request('http://localhost:12345/test/testCreated', {
  //   streaming: true,
  //   stream: ctx.req
  // }, function (err, data, res) {
  //   ctx.body =  res;
  // });
};

/**
 * @api /testResJsonError
 */
exports.testResJsonError = function (ctx) {
  let data = {};
  data.data = data;
  ctx.body = data;
};
