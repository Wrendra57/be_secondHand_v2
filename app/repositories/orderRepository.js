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

const myOrder = async ({ uuid }) => {
  try {
    const getOrder = await sequelize.query(`
    select 
        o."id_order",
        p."id_product",
        o."status",
        o."isAccept",
        o."price" as "offer",
        o."updatedAt",
        p."name_product",
        p."category",
        p."price",
        u."name",
        u."city",
        u."no_hp",
        u."photo_profile" as "avatar seller",
        ip."url" as "foto"
    from public."Orders" as "o"
    left join public."Products" as "p" on o."id_product"=p."id_product"
    left join public."Users" as "u" on p."id_seller"=u."uuid"
    LEFT JOIN (
        SELECT DISTINCT ON (id_product) "id_product", "url"
        FROM public."Image_products"
        ORDER BY "id_product", "id" ASC
        ) AS ip ON ip."id_product" = p."id_product"
    where o."id_buyer" = '${uuid}'
    order by o."updatedAt" desc
    `);

    return getOrder[0];
  } catch (error) {
    console.log(error.message);
  }
};

const produkOffered = async ({ uuid }) => {
  try {
    const getOffer = await sequelize.query(`
      select 
        ip."url",
        p."name_product",
        p."price",
        o."id_order",
        o."status" as "status_order",
        o."isAccept",
        o."price" as "offer_price",
        o."updatedAt",
        t."id_transaction",
        t."status" as "status_transaction",
        t."isFinished" as "isFinished_transaction",
        t."isSucces" as "isSucces_transaction"

      from public."Orders" as "o"
      left join public."Products" as "p" on o."id_product"=p."id_product"
      
      LEFT JOIN (
              SELECT DISTINCT ON (id_product) "id_product", "url"
              FROM public."Image_products"
              ORDER BY "id_product", "id" ASC
      ) AS ip ON ip."id_product" = p."id_product"
      left join public."Transactions" as "t" on t."id_order"=o."id_order"
      where p."id_seller"='${uuid}'
      order by o."updatedAt" desc
    `);
    return getOffer[0];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createOrder, checkOrder, myOrder, produkOffered };
