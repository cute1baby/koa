'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 注册中间件
  app.middleware.checkToken();
  router.post('/login', controller.user.login);
  router.get('/findUser', controller.user.findUser);
};
