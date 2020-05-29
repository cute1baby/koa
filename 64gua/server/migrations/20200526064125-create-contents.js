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
      contentId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contentList: {
        allowNull: false,
        type: Sequelize.STRING
      },
      desc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      likeCount: {
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
    }, { // 数据库编码设置
        tableName: 'contents',
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin'
    }).then(() => {
        queryInterface.addIndex('contents', {  // 把commentId设置为外键
            name: 'name',
            fields: ['name']
        });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contents');
  }
};