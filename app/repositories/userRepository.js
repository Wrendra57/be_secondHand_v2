const { User } = require("../models");

const createUser = async (params) => {
  try {
    const create = await User.create(params);
    return create;
  } catch (error) {}
};

const findByEmail = async (email) => {
  try {
    const getUser = await User.findOne({ where: { email: email } });
    return getUser;
  } catch (error) {}
};

module.exports = { createUser, findByEmail };
