'use strict';

const bodyParser  = require('koa-bodyparser');
const _ = require('lodash');
// 配置和express的不一样
// TODO: 兼容express的配置
const defaultOptions = {
  enableTypes: ['json', 'form'],
  encoding: 'utf-8',
  formLimit: '56kb',
  jsonLimit: '1mb',
  textLimit: '1mb',
  strict: true,
};

module.exports = function (app, options) {
  options = _.merge(defaultOptions, options);
  return bodyParser(options);
};
