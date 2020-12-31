'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/addArticleTypes', controller.atypes.addArticleTypes);
  router.get('/getArticleTypeList', controller.atypes.getArticleTypeList);
  router.get('/getTypeAndArtLens', controller.atypes.getTypeAndArtLens);
  
  router.post('/addArticleData', controller.article.addArticleData);
  router.get('/getArticleList', controller.article.getArticleList);
  router.get('/findArticleByParams', controller.article.findArticleByParams);
};
