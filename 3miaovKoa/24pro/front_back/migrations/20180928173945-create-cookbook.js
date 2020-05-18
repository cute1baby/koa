'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cookbook', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
        defaultValue: 0
      },
      categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      cover: {
        type: Sequelize.CHAR(15),
        allowNull: false,
        defaultValue: ''
      },
      craftId: {
        type: Sequelize.INTEGER,
        field: 'craft_id',
        allowNull: false,
        defaultValue: 0
      },
      levelId: {
        type: Sequelize.INTEGER,
        field: 'level_id',
        allowNull: false,
        defaultValue: 0
      },
      tasteId: {
        type: Sequelize.INTEGER,
        field: 'taste_id',
        allowNull: false,
        defaultValue: 0
      },
      needTime: {
        type: Sequelize.INTEGER(5),
        field: 'need_time',
        allowNull: false,
        defaultValue: 0
      },
      ingredients: {
        type: Sequelize.STRING(1000),
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
      tableName: 'cookbook',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
      indexes: [
        {
          
        }
      ]
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cookbook');
  }
};