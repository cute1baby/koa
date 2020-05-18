'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user-profile', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        unique: true,
        allowNull: false,
        defaultValue: 0
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      realName: {
        type: Sequelize.STRING,
        field: 'real_name',
        allowNull: false,
        defaultValue: ''
      },
      gender: {
        type: Sequelize.ENUM(['男','女','保密']),
        allowNull: false,
        defaultValue: '保密'
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    }, {
      tableName: 'user-profile',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      indexes: [
        {
          
        }
      ]
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user-profile');
  }
};