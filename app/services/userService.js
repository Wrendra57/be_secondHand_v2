const UserRepository = require("../repositories/userRepository");
const Bycrypt = require("../utils/bycrypt");
const { JWT } = require("../utils/constant");
const jwt = require("jsonwebtoken");
const register = async ({ email, name, password }) => {
  try {
    if (name === "" || !name) {
      return {
        status: 400,
        message: "Nama tidak boleh kosong",
        data: null,
      };
    }
    if (email === "" || !email) {
      return {
        status: 400,
        message: "Email tidak boleh kosong",
        data: null,
      };
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return {
          status: 400,
          message: "Email tidak valid",
          data: null,
        };
        return;
      }
    }
    if (password === "" || !password) {
      return {
        status: 400,
        message: "Password tidak boleh kosong",
        data: null,
      };
    }

    const emailCheck = await UserRepository.findByEmail(email);
    if (emailCheck) {
      return {
        status: 400,
        message: "Email sudah terdaftar",
        data: email,
      };
    }
    console.log("Email ===>" + email);
    const hassedpassword = await Bycrypt.EncodePassword(password);
    const createUser = await UserRepository.createUser({
      email: email,
      password: hassedpassword,
      name: name,
      photo_profile:
        "https://res.cloudinary.com/dhtypvjsk/image/upload/v1691732035/nopicture_u5efnz.png",
    });
    user = JSON.parse(JSON.stringify(createUser));
    delete user.password;
    return {
      status: 200,
      message: "succses create data",
      data: user,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
const Login = async ({ email, password }) => {
  try {
    if (email === "" || !email) {
      return {
        status: 400,
        message: "Email tidak boleh kosong",
        data: null,
      };
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return {
          status: 400,
          message: "Email tidak valid",
          data: null,
        };
        return;
      }
    }
    if (password === "" || !password) {
      return {
        status: 400,
        message: "Password tidak boleh kosong",
        data: null,
      };
    }
    const getUser = await UserRepository.findByEmail(email);
    if (!getUser) {
      return {
        status: 400,
        message: "Email tidak terdaftar",
        data: null,
      };
    }
    const comparePasswords = await Bycrypt.comparePasswords(
      password,
      getUser.password
    );
    if (!comparePasswords) {
      return {
        status: 400,
        message: "Password salah",
        data: null,
      };
    }
    const token = jwt.sign(
      {
        uuid: getUser.uuid,
        email: getUser.email,
      },
      JWT.SECRET,
      {
        expiresIn: JWT.EXPIRED,
      }
    );
    return {
      status: 200,
      message: "Success Logged in",
      data: { token: token, uuid: getUser.uuid },
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = { register, Login };
