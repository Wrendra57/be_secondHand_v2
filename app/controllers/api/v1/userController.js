const UserService = require("../../../services/userService");

const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const regis = await UserService.register({
      name: name,
      email: email,
      password: password,
    });
    return res.status(regis.status).json(regis);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
const LoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const login = await UserService.Login({ email: email, password: password });
    return res.status(login.status).json(login);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const GetUserDetail = async (req, res, next) => {
  try {
    const getUser = await UserService.getUserByUuid({ uuid: req.user.uuid });
    return res.status(getUser.status).json(getUser);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
const UpdateUser = async (req, res) => {
  try {
    const { name, city, address, noHp } = req.body;

    const update = await UserService.updateUser({
      name: name,
      city: city,
      address: address,
      noHp: noHp,
      files: req.files,
      uuid: req.user.uuid,
    });
    return res.status(200).json(update);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = { Register, LoginController, GetUserDetail, UpdateUser };
