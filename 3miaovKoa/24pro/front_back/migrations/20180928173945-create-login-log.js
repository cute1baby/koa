'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('login-log', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
        defaultValue: 0
      },
      loginIpAt: {
        type: Sequelize.CHAR(15),
        allowNull: false,
        field: 'login_ip_at',
        defaultValue: ''
      },
      loginAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'login_at'
      }
    }, {
      tableName: 'login-log',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      timestamp: false,
      indexes: [
        {
          
        }
      ]
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('login-log');
  }
};