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
module.exports = { Register, LoginController };
