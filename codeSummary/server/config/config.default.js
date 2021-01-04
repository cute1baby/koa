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
        port: 3006,
        // hostname: '127.0.0.1'
    }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1608781675479_2528';
    // 设置安全请求的方式
    config.security = {
        csrf: {
            enable: false,
        },
        domainWhiteList: ["http://localhost:8080"], //白名单
    };

    // 设置mongoose配置
    config.mongoose = {
        client: {
          url: 'mongodb://selfowner:selfowner@127.0.0.1:27017/qianduan?authSource=admin',
          options: {}
        }
    };

  // add your middleware config here
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
