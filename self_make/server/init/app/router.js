'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 注册中间件
  app.middleware.checkToken();
  // 登录部分
  router.post('/login', controller.user.login);
  router.get('/findUser', controller.user.findUser);

  // tag请求部分
  router.get('/getAllTags', controller.tag.getAllTags);
  router.get('/saveAllTags', controller.tag.saveAllTags);
  router.get('/searchTags', controller.tag.searchTags);
};
