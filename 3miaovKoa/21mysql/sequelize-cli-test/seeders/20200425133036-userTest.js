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
      // 给users表中添加种子数据
      return queryInterface.bulkInsert('Users', [
        {
          username: 'John Doe',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'Tony Jom',
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
    // 删除users表
    return queryInterface.bulkDelete('users', null, {});
  }
};
