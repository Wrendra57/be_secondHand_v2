"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Image_product.belongsTo(models.Product, {
        foreignKey: "id_product",
      });
    }
  }
  Image_product.init(
    {
      url: DataTypes.STRING,
      id_product: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Image_product",
    }
  );
  return Image_product;
};
