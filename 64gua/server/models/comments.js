'use strict';
module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define('Comments', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    commentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: "Contents",
            key: 'contentId'
        }
    },
    content: {
        allowNull: false,
        type: Sequelize.STRING
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
    tableName: 'comments'
  });
  Comments.associate = function(models) {
    // associations can be defined here
    Comments.belongsTo(models.Contents, {
        foreignKey: 'commentId'
    });
  };
  return Comments;
};