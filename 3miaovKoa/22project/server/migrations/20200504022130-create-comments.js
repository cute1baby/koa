'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
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
      content: {
        allowNull: false,
        type: Sequelize.STRING(1000)
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
      tableName: 'comments',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {
     queryInterface.addIndex('comments', {
        name: 'content_id',
        fields: ['content_id']
      });
    }).then(() => {
     queryInterface.addIndex('comments', {
        name: 'user_id',
        fields: ['user_id']
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};