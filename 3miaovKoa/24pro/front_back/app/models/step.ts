import { Sequelize, DataTypes, Models, Model } from "sequelize";

'use strict';
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Step = sequelize.define('step', {
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
    pic: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: ''
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
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
    tableName: 'step',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    indexes: [
      {
        
      }
    ]
  });
  Step.associate = function(this: Model<any, any>, models: Models) {
    // associations can be defined here

    // 所属食谱
    this.belongsTo( models['cookbook'], {
      foreignKey: 'cookbookId'
    } );
  };
  return Step;
};