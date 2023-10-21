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

const getMyOrder = async (req, res) => {
  try {
    const get = await OrderService.getMyOrder({ uuid: req.user.uuid });
    return res.status(get.status).json(get);
  } catch (error) {
    console.log(error.message);
  }
};

const producOffered = async (req, res, next) => {
  try {
    const getOffer = await OrderService.produkOffered({ uuid: req.user.uuid });
    return res.status(getOffer.status).json(getOffer);
  } catch (error) {
    console.log(error.message);
  }
};
const getOrderById = async (req, res, next) => {
  try {
    const getOrder = await OrderService.getOrderById({
      uuid: req.user.uuid,
      id_order: req.params.id,
    });
    return res.status(getOrder.status).json(getOrder);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  createOrder,
  checkOrder,
  getMyOrder,
  producOffered,
  getOrderById,
};
