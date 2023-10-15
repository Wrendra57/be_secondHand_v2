const { Product, sequelize, Image_product } = require("../models");
const { Op } = require("sequelize");
const createProduct = async (params) => {
  try {
    const createProduct = await Product.create(params);

    return createProduct;
  } catch (error) {
    console.log(error.message);
  }
};

const getListProduct = async ({ limit, offset }) => {
  try {
    const getList = await sequelize.query(`
    SELECT p."id" as "id",
          p."id_product" as "id_product",
          p."id_seller" as "id_seller",
          p."name_product" as "name_product",
          p."stock",
          p."price",
          p."category",
          json_agg(ip."url") as "foto"
    FROM public."Products" as "p"
    LEFT JOIN public."Image_products" as "ip" ON ip."id_product" = p."id_product"
    WHERE p."stock" != 0
    GROUP BY p."id", p."id_product", p."id_seller", p."name_product"
    ORDER BY p."id" ASC
    LIMIT ${limit} OFFSET ${offset};
    `);
    return getList[0];
  } catch (error) {
    console.log(error.message);
  }
};

const destroyProduct = async (id_product) => {
  try {
    const deleting = await Product.destroy({
      where: {
        id_product: id_product,
      },
    });
    return deleting;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getListProduct, destroyProduct, createProduct };
