'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      like_count: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      comment_count: {
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
      tableName: 'contents',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {  // 把username设置为键值
     queryInterface.addIndex('contents', {
        name: 'user_id',
        fields: ['user_id']
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contents');
  }
};