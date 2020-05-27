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
    return queryInterface.bulkInsert('Comments', [
        {
            commentId: 1,
            content: '礼貌是友好交流的起点',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            commentId: 2,
            content: '学习传统文化',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            commentId: 2,
            content: '体会人生价值',
            createdAt: new Date(),
            updatedAt: new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
