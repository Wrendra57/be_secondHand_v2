const { sequelize, Order } = require("../models");
const { Op } = require("sequelize");

const createOrder = async (params) => {
  try {
    const create = await Order.create(params);
    return create;
  } catch (error) {
    console.log(error.message);
  }
};

const checkOrder = async ({ id_product, id_buyer }) => {
  try {
    const getOrder = await Order.findOne({
      where: { id_product: id_product, id_buyer: id_buyer, isAccept: null },
    });
    return getOrder;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createOrder, checkOrder };
