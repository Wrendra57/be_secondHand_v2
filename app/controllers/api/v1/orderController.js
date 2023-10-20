const OrderService = require("../../../services/orderService");

const createOrder = async (req, res, next) => {
  try {
    // const { id_product, price } = req.body;

    const create = await OrderService.createOrder({
      id_product: req.params.id_product,
      price: req.body.price,
      id_buyer: req.user.uuid,
    });
    return res.status(create.status).json(create);
  } catch (error) {}
};
const checkOrder = async (req, res, next) => {
  try {
    const check = await OrderService.checkOrder({
      id_product: req.params.id_product,
      id_buyer: req.user.uuid,
    });
    return res.status(check.status).json(check);
  } catch (error) {}
};
module.exports = { createOrder, checkOrder };
