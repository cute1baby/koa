import { Sequelize, DataTypes, Models, Model } from "sequelize";

'use strict';
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const UserProfile = sequelize.define('user-profile', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      unique: true,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    real_name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    gender: {
      type: DataTypes.ENUM(['男','女','保密']),
      allowNull: false,
      defaultValue: '保密'
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: 'user-profile',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    indexes: [
      {
        
      }
    ]
  });
  UserProfile.associate = function(this: Model<any, any>, models: Models) {
    // associations can be defined here

    this.belongsTo( models['user'], {
      foreignKey: 'userId'
    } );
  };
  return UserProfile;
};