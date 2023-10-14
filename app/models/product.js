"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.hasMany(models.Image_product, {
        foreignKey: "id_product",
      });
      models.Product.hasMany(models.Order, {
        foreignKey: "id_product",
      });
      models.Product.belongsTo(models.User, {
        foreignKey: "uuid",
      });
    }
  }
  Product.init(
    {
      id_product: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      id_seller: DataTypes.UUID,
      name_product: DataTypes.STRING,
      category: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      // deletedAt: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
