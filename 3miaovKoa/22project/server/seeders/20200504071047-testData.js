'use strict';

const md5 = require('md5');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Kimoo',
        password: md5('123456'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Reci',
        password: md5('123321'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}).then(data => {
      return queryInterface.bulkInsert('Contents', [
        {
          user_id: 1,
          title: 'aaaaa',
          content: '1111111',
          like_count: 0,
          comment_count: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          title: 'bbbbbb',
          content: '22222222',
          like_count: 0,
          comment_count: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 1,
          title: 'ccccccc',
          content: '3333333',
          like_count: 0,
          comment_count: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 2,
          title: 'ddddd',
          content: '444444',
          like_count: 0,
          comment_count: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          user_id: 1,
          title: 'eeeee',
          content: '5555555',
          like_count: 0,
          comment_count: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {}).then(data => {
        return queryInterface.bulkInsert('Comments', [
          {
            content_id: 1,
            user_id: 1,
            content: '评论内容11111111',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            content_id: 1,
            user_id: 2,
            content: '评论内容22222',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            content_id: 2,
            user_id: 1,
            content: '评论内容33333333',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]);
      })
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
