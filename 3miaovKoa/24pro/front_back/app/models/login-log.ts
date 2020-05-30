import { Sequelize, DataTypes, Models, Model } from "sequelize";

'use strict';
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const LoginLog = sequelize.define('login-log', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    loginIpAt: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      field: 'login_ip_at',
      defaultValue: ''
    },
    loginedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'login_at'
    }
  }, {
    tableName: 'login-log',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: false,
    indexes: [
      {
        
      }
    ]
  });
  LoginLog.associate = function(this: Model<any, any>, models: Models) {
    // associations can be defined here
    
    this.belongsTo( models['user'], {
      foreignKey: 'userId'
    } );
  };
  return LoginLog;
};