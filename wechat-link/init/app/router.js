'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
//   // 注册中间件
//   app.middleware.checkWechat();
    // 验证服务器的有效性
    router.get('/', controller.home.index);
    // 回复自定义消息
    router.post('/', controller.home.getReplyContent);

    // 获取acessToken
    router.get('/getAccessToken', controller.home.getAccessToken);
    // 获取用户信息
    router.get('/getUserList', controller.home.getUserList);

    // 设置自定义菜单
    router.get('/setMenuList', controller.home.setMenuList);
    // 获取自定义菜单
    router.get('/getMenuList', controller.home.getMenuList);

    // 用户授权
    router.get('/getAuthorization', controller.home.getAuthorization);

};
