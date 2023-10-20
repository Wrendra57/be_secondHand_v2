"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.hasMany(models.Transactions, {
        foreignKey: "id_order",
      });
      models.Order.belongsTo(models.Product, {
        foreignKey: "id_product",
      });
      models.Order.belongsTo(models.User, {
        foreignKey: "id_buyer",
      });
    }
  }
  Order.init(
    {
      id_order: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      id_buyer: DataTypes.UUID,
      id_product: DataTypes.UUID,
      status: DataTypes.STRING,
      isAccept: DataTypes.BOOLEAN,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
