'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {  // 对数据库表名称和编码进行设置
      tableName: 'likes',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {
     queryInterface.addIndex('likes', {
        name: 'content_id',
        fields: ['content_id']
      });
    }).then(() => {
     queryInterface.addIndex('likes', {
        name: 'user_id',
        fields: ['user_id']
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  }
};