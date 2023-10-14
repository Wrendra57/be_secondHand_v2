const { User } = require("../models");
const { Op } = require("sequelize");
const createUser = async (params) => {
  try {
    // console.log(params);
    const create = await User.create(params);
    // console.log("create");
    return create;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const findByEmail = async (email) => {
  try {
    const getUser = await User.findOne({ where: { email: email } });
    return getUser;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const findByUuid = async (uuid) => {
  try {
    const getUser = await User.findOne({ where: { uuid: uuid } });
    return getUser;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const updateUser = async ({ payload, uuid }) => {
  try {
    console.log(payload);
    
    const update = await User.update(payload, { where: { uuid: uuid } });
    console.log(update);
    return update;
  } catch (error) {
    console.log("sad");
  }
};
const deleteBY = async (params) => {
  try {
    const adelete = await User.destroy({
      where: {
        email: { [Op.substring]: params },
      },
    });

    return adelete;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

module.exports = { createUser, findByEmail, deleteBY, findByUuid, updateUser };
