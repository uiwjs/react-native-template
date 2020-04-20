const delay = require('mocker-api/lib/delay');
const user = require('./user.mock');

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
  ...user,
};

module.exports = noProxy ? { ...proxy } : delay(proxy, 1000);
// module.exports = proxy;
