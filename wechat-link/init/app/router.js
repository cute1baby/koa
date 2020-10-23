'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
//   // 注册中间件
//   app.middleware.checkWechat();
    router.get('/', controller.home.index);
    router.get('/getAccessToken', controller.home.getAccessToken);
    router.get('/getUserList', controller.home.getUserList);
};
