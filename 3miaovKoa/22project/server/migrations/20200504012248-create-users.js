'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {  // 增加password字段存储
        type: Sequelize.CHAR(32),
        allowNull: false
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
      tableName: 'users',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {  // 把username设置为键值
      return queryInterface.addIndex('users', {
        name: 'username',
        unique: true,
        fields: ['username']
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};