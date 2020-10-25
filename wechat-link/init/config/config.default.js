/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 修改绑定的端口号
  config.cluster = {
      listen: {
          port: 3005,
          // hostname: '127.0.0.1'
      }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1603366258616_8309';
  // 设置安全请求的方式
  config.security = {
    csrf: {
        enable: false,
    }
  };
  // 设置允许跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  // add your middleware config here
  // config.middleware = ['checkWechat'];
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
