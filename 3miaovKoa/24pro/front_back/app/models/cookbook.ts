import { Sequelize, DataTypes, Models, Model } from "sequelize";

'use strict';
module.exports = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Cookbook = sequelize.define('cookbook', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
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
    categoryId: {
      type: DataTypes.INTEGER,
      field: 'category_id',
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    cover: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      defaultValue: ''
    },
    craftId: {
      type: DataTypes.INTEGER,
      field: 'craft_id',
      allowNull: false,
      defaultValue: 0
    },
    levelId: {
      type: DataTypes.INTEGER,
      field: 'level_id',
      allowNull: false,
      defaultValue: 0
    },
    tasteId: {
      type: DataTypes.INTEGER,
      field: 'taste_id',
      allowNull: false,
      defaultValue: 0
    },
    needTime: {
      type: DataTypes.INTEGER(5),
      field: 'need_time',
      allowNull: false,
      defaultValue: 0
    },
    ingredients: {
      type: DataTypes.STRING(1000),
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
    tableName: 'cookbook',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    indexes: [
      {
        
      }
    ]
  });
  Cookbook.associate = function(this: Model<any, any>, models: Models) {
    // associations can be defined here

    // 所属用户
    this.belongsTo( models['user'], {
      foreignKey: 'userId'
    } );

    // 所属分类
    this.belongsTo( models['category'], {
      foreignKey: 'categoryId'
    } );

    // 包含步骤
    this.hasMany( models['step'] );

    // 包含评论
    this.hasMany( models['comment'] );

    // 包含收藏
    this.hasMany( models['favorite'] );
  };
  return Cookbook;
};