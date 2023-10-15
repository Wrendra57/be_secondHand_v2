const ProductService = require("../../../services/productService");
const createProduct = async (req, res, next) => {
  try {
    const { name_product, category, price, description, stock } = req.body;
    console.log(name_product, category, price, description, stock);
    console.log(req.files);
    const create = await ProductService.createProduct({
      name_product,
      category,
      price,
      description,
      stock,
      files: req.files,
      uuid: req.user.uuid,
    });
    return res.status(create.status).json(create);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const getListProduct = async (req, res, next) => {
  try {
    const { limit, offset } = req.params;
    const getProduct = await ProductService.getListProduct({ limit, offset });
    return res.status(getProduct.status).json(getProduct);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

module.exports = { createProduct, getListProduct };
