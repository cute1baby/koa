'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Contents', [
        {
            name: '乾为天',
            contentList: '1,1,1,1,1,1',
            desc: '测试数据',
            likeCount: 106,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: '坤为地',
            contentList: '2,2,2,2,2,2',
            desc: '测试描述数据',
            likeCount: 99,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Contents', null, {});
  }
};
