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
    SELECT 
          p."id" as "id",
          p."id_product"  ,
          p."id_seller"  ,
          p."name_product" ,
          p."stock",
          p."price",
          p."category",
          ip."url" as "foto"
    FROM public."Products" as "p"
    LEFT JOIN (
        SELECT DISTINCT ON (id_product) "id_product", "url"
        FROM public."Image_products"
        ORDER BY "id_product", "id" ASC
    ) AS ip ON ip."id_product" = p."id_product"
    WHERE p."stock" != 0
    LIMIT ${limit} OFFSET ${offset};
    `);
    return getList[0];
  } catch (error) {
    console.log(error.message);
  }
};

const getProductById = async (params) => {
  try {
    const getProduct = await sequelize.query(`
        SELECT
            p."id",
            p."id_product",
            p."id_seller",
            p."name_product",
            p."stock",
            p."price",
            p."category",
            p."description",
            foto."url" as "foto",
            usr."name" as "name_seller",
            usr."uuid" as "user_id",
            usr."photo_profile" as "avatar",
            usr."city"
        FROM public."Products" as "p"
        LEFT JOIN (
            SELECT "id_product", json_agg("url") as "url"
            FROM public."Image_products"
            GROUP BY "id_product"
        ) as foto ON foto."id_product" = p."id_product"
        LEFT JOIN public."Users" as "usr" ON p."id_seller" = usr."uuid"
        WHERE p."id_product" = '${params}';
    `);
    // console.log(getProduct);
    return getProduct[0];
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

const getProductSeller = async ({ uuid, offset }) => {
  try {
    const getProduct = await sequelize.query(`
        SELECT 
            p."id" as "id",
            p."id_product"  ,
            p."id_seller"  ,
            p."name_product" ,
            p."stock",
            p."price",
            p."category",
            ip."url" as "foto"
        FROM public."Products" as "p"
        LEFT JOIN (
            SELECT DISTINCT ON (id_product) "id_product", "url"
            FROM public."Image_products"
            ORDER BY "id_product", "id" ASC
        ) AS ip ON ip."id_product" = p."id_product"
        WHERE p."stock" != 0 and p."id_seller"='${uuid}'
        order by id asc
        LIMIT 15 OFFSET ${offset};
    `);
    return getProduct[0];
  } catch (error) {
    console.log("dsaads");
    console.log(error.message);
  }
};

module.exports = {
  getProductById,
  getListProduct,
  destroyProduct,
  createProduct,
  getProductSeller,
};
