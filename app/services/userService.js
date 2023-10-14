const { use } = require("..");
const UserRepository = require("../repositories/userRepository");
const Bycrypt = require("../utils/bycrypt");
const { JWT } = require("../utils/constant");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinaryConfig");
const uploadImage = require("../utils/uploader");
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
    if (!createUser) {
      return {
        status: 200,
        message: "gagal mendaftar",
        data: null,
      };
    }
    console.log(createUser);
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

const getUserByUuid = async ({ uuid }) => {
  try {
    const getUser = await UserRepository.findByUuid(uuid);
    if (!getUser) {
      return {
        status: 400,
        message: "User not found",
        data: null,
      };
    }
    user = JSON.parse(JSON.stringify(getUser));
    delete user.password;
    return {
      status: 200,
      message: "success getUser",
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

const updateUser = async ({ name, city, address, noHp, files, uuid }) => {
  try {
    if (!name || name === "") {
      return {
        status: 400,
        message: "Nama tidak boleh kosong",
        data: null,
      };
    }
    if (!city || city === "") {
      return {
        status: 400,
        message: "Kota tidak boleh kosong",
        data: null,
      };
    }
    if (!address || address === "") {
      return {
        status: 400,
        message: "Alamat tidak boleh kosong",
        data: null,
      };
    }
    if (!noHp || noHp === "") {
      return {
        status: 400,
        message: "No HP tidak boleh kosong",
        data: null,
      };
    }
    const getUser = await UserRepository.findByUuid(uuid);
    if (!getUser) {
      return {
        status: 400,
        message: "User tidak ditemukan",
        data: null,
      };
    }
    let payload = {
      name: name,
      city: city,
      address: address,
      no_hp: noHp,
    };

    if (files.length > 0) {
      const upload = await uploadImage({ image: files[0] });
      payload = {
        ...payload,
        photo_profile: upload.secure_url,
      };
    }
    const update = await UserRepository.updateUser({
      payload: payload,
      uuid: uuid,
    });
    if (!update) {
      return {
        status: 400,
        message: "update gagal",
        data: null,
      };
    }
    const result = await UserRepository.findByUuid(uuid);
    user = JSON.parse(JSON.stringify(result));
    delete user.password;
    return {
      status: 200,
      message: "update profile berhasil",
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
module.exports = { register, Login, getUserByUuid, updateUser };
