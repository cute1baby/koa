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
          hostname: '127.0.0.1'
      }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1603366258616_8309';

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
