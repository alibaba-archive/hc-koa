'use strict';

const path = require('path');
const serv = require('koa-static');
const _ = require('lodash');
const defaultOptions = {
  root: null
};

module.exports = function (app, options) {
  if (!options.root) {
    options.root = path.join(app.root, './assets');
  }

  let opts = _.merge({}, defaultOptions, options);
  // 警告，有测试未通过
  return serv(options.root, opts);
};
