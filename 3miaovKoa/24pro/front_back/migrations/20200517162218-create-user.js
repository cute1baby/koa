'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        comment: '用户id'
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        defaultValue: '',
        comment: '用户名'
      },
      password: {
        type: Sequelize.CHAR(32),
        allowNull: false,
        defaultValue: '',
        comment: '密码'
      },
      disabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否为禁用状态'
      },
      mobile: {
        type: Sequelize.CHAR(12),
        unique: true,
        allowNull: false,
        defaultValue: '',
        comment: '手机号码'
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
        defaultValue: '',
        comment: '邮箱'
      },
      createdIpAt: {
        type: Sequelize.CHAR(15),
        allowNull: false,
        field: 'created_ip_at',
        defaultValue: '',
        comment: '用户注册时的IP'
      },
      updatedIpAt: {
        type: Sequelize.CHAR(15),
        allowNull: false,
        field: 'updated_ip_at',
        defaultValue: '',
        comment: '用户最新一次登录的IP'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
        comment: '用户注册的时间'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
        comment: '用户最新一次登录的时间'
      }
    }, {
      tableName: 'user',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      indexes: [
        {

        }
      ]
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};