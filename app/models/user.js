"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Product, {
        foreignKey: "id_seller",
      });
      models.User.hasMany(models.Order, {
        foreignKey: "id_buyer",
      });
    }
  }
  User.init(
    {
      uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
      no_hp: DataTypes.STRING,
      photo_profile: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
