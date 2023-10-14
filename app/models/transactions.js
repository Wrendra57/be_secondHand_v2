"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Transactions.belongsTo(models.Order, {
        foreignKey: "id_order",
      });
    }
  }
  Transactions.init(
    {
      id_transaction: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
      id_order: DataTypes.UUID,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
