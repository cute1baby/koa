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
  // 用户部分
  router.get('/saveBaseUserInfo', controller.user.saveBaseUserInfo);


  // tag请求部分
  router.get('/getAllTags', controller.tag.getAllTags);
  router.get('/saveAllTags', controller.tag.saveAllTags);
  router.post('/searchTags', controller.tag.searchTags);

  // 关注标签表部分
  router.post('/addAttention', controller.userTagRelate.addAttention);
  router.post('/cancelAttention', controller.userTagRelate.cancelAttention);
  router.post('/findSelfAttention', controller.userTagRelate.findSelfAttention);
};
