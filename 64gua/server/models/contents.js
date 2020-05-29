'use strict';
module.exports = (sequelize, Sequelize) => {
  const Contents = sequelize.define('Contents', {
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
  }, {
    tableName: 'contents'
  });
  Contents.associate = function(models) {
    // associations can be defined here
    Contents.hasMany(models.Comments, {
        foreignKey: 'commentId'
    });
  };
  return Contents;
};