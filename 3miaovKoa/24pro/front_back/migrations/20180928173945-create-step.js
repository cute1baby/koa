'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('step', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cookbookId: {
        type: Sequelize.INTEGER,
        field: 'cookbook_id',
        allowNull: false,
        defaultValue: 0
      },
      pic: {
        type: Sequelize.CHAR(15),
        allowNull: false,
        defaultValue: ''
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
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
      tableName: 'step',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      indexes: [
        {
          
        }
      ]
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('step');
  }
};