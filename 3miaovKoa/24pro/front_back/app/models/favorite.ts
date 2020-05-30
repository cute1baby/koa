import { Sequelize, DataTypes, Models, Model } from "sequelize";

'use strict';
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Favorite = sequelize.define('favorite', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    cookbookId: {
      type: DataTypes.INTEGER,
      field: 'cookbook_id',
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'cookbook',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    tableName: 'favorite',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    indexes: [
      {
        
      }
    ]
  });
  Favorite.associate = function(this: Model<any, any>, models: Models) {
    // associations can be defined here

    // 所属用户
    this.belongsTo( models['user'], {
      foreignKey: 'userId'
    } );

    // 所属菜谱
    this.belongsTo( models['cookbook'], {
      foreignKey: 'cookbookId'
    } );
  };
  return Favorite;
};