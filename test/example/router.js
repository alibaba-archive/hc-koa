'use strict';

module.exports = function (router) {
  router.get('/test_err_middleware', function (ctx) {
    ctx.throw({
      code: 'ERR_GEN_MIDDLEWARE',
      message: 'err_message'
    });
  });

  router.get('/test_middleware', function (ctx, next) {
    if (!ctx[ctx.query.q]) {
      return next('method not found');
    }
    ctx.body = ctx[ctx.query.q]();
  });

  router.get('/test_cookie_session', function (req, res) {
    let body;
    switch (req.query.action) {
      case 'get':
        body = req.session.name;
        break;
      case 'set':
        req.session.name = 'session.' + req.query.data;
        body = 'success';
        break;
      default:
        body = 'null';
    }
    res.end(body);
  });

  router.get('/test_csrf', function (req, res) {
    res.end(req.csrfToken());
  });

  router.post('/test_csrf', function (req, res) {
    res.end('success');
  });

  // router.get('/test_gen_ctrl', function* (req, res) {
  //   yield new Promise(function (resolve, reject) {
  //     setTimeout(function () {
  //       resolve();
  //     }, 200);
  //   });
  //   res.end('success');
  // });

  router.get('/test_redirect', function (ctx) {
    ctx.redirect('/test_redirect_success');
  });

  router.get('/test_redirect_illegal', function (ctx) {
    ctx.redirect('http://illegal_domain/test_redirect_success');
  });

  router.get('/test_redirect_glob', function (ctx) {
    ctx.redirect('http://www.aliyun.com/test_redirect_success');
  });

  router.get('/test_redirect_full_match', function (ctx) {
    ctx.redirect('http://test.alibaba.com/test_redirect_success');
  });

  router.get('/test_redirect_glob_match_illegal', function (ctx) {
    ctx.redirect('http://illegal.alibaba.com/test_redirect_success');
  });

  router.post('/test_body_parser', function (ctx) {
    ctx.end('success');
  });
};
