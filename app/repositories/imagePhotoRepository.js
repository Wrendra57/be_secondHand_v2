const { Product, sequelize, Image_product } = require("../models");
const { Op } = require("sequelize");

const createPhoto = async (params) => {
  try {
    const create = await Image_product.create(params);
    return create;
  } catch (error) {
    console.log(error);
  }
};

const deleteAllPhoto = async (id_product) => {
  try {
    const deleting = await Image_product.destroy({
      where: {
        id_product: id_product,
      },
    });
    return deleting;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { deleteAllPhoto, createPhoto };
