/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1599753389631_409";
    // 设置安全请求的方式
    config.security = {
        csrf: {
            enable: false,
        },
        domainWhiteList: ["http://localhost:8080"], //白名单
    };
    // 设置mongoose配置
    config.mongoose = {
        url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/juejin',
        options: {
            
        },
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
