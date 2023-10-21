const OrderRepository = require("../repositories/orderRepository");
const UserRepository = require("../repositories/userRepository");
const ProductRepository = require("../repositories/productRepository");
const createOrder = async ({ id_product, price, id_buyer }) => {
  try {
    if (!id_product || id_product === "") {
      return {
        status: 400,
        message: "id_product tidak boleh kosong",
        data: null,
      };
    }
    if (!price || price <= 0) {
      return {
        status: 400,
        message: "price tidak boleh kosong",
        data: null,
      };
    }
    if (!id_buyer || id_buyer === "") {
      return {
        status: 400,
        message: "id_buyer tidak boleh kosong",
        data: null,
      };
    }

    const getUser = await UserRepository.findByUuid(id_buyer);
    if (!getUser) {
      return {
        status: 400,
        message: "User tidak ditemukan",
        data: null,
      };
    }

    const getProduct = await ProductRepository.getProductById(id_product);
    console.log(getProduct[0]);
    if (!getProduct[0] || getProduct.length === 0) {
      return {
        status: 400,
        message: "Product tidak ditemukan",
        data: null,
      };
    }
    if (getProduct[0].stock <= 0) {
      return {
        status: 400,
        message: "Stok produk kosong",
        data: null,
      };
    }
    if (getProduct[0].id_seller === getUser.uuid) {
      return {
        status: 400,
        message: "Tidak bisa membeli barang sendiri",
        data: null,
      };
    }
    const checkOrder = await OrderRepository.checkOrder({
      id_product,
      id_buyer,
    });
    if (checkOrder) {
      return {
        status: 400,
        message:
          "Order pada barang sama telah dibuat dan belum ditolak/terima seller",
        data: null,
      };
    }
    console.log(getProduct[0].id_seller, getUser.uuid);
    const create = await OrderRepository.createOrder({
      id_product: id_product,
      id_buyer: id_buyer,
      price: price,
      status: "Menunggu",
    });
    if (!create) {
      return {
        status: 400,
        message: "Gagal membuat order",
        data: null,
      };
    }

    return {
      status: 200,
      message: "Berhasil membuat order",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const checkOrder = async ({ id_product, id_buyer }) => {
  try {
    if (id_product === "" || !id_product) {
      return {
        status: 400,
        message: "id_product tidak boleh kosong",
        data: null,
      };
    }
    if (id_buyer === "" || !id_buyer) {
      return {
        status: 400,
        message: "id_buyer tidak boleh kosong",
        data: null,
      };
    }
    const getUser = await UserRepository.findByUuid(id_buyer);
    if (!getUser) {
      return {
        status: 400,
        message: "User tidak ditemukan",
        data: null,
      };
    }
    // console.log(getUser);
    const check = await OrderRepository.checkOrder({ id_buyer, id_product });
    if (check) {
      return {
        status: 200,
        message: "order ditemukan",
        data: true,
      };
    }
    return {
      status: 200,
      message: "order tidak ditemukan",
      data: false,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const getMyOrder = async ({ uuid }) => {
  try {
    const getUser = await UserRepository.findByUuid(uuid);
    if (!getUser) {
      return {
        status: 400,
        message: "User tidak ditemukan",
        data: null,
      };
    }
    const getOrder = await OrderRepository.myOrder({ uuid: uuid });
    console.log(getOrder);
    return {
      status: 200,
      message: "order ditemukan",
      data: getOrder,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const produkOffered = async ({ uuid }) => {
  try {
    const getUser = await UserRepository.findByUuid(uuid);
    if (!getUser) {
      return {
        status: 400,
        message: "User tidak ditemukan",
        data: null,
      };
    }

    const getOffer = await OrderRepository.produkOffered({ uuid: uuid });
    console.log(getOffer);
    return {
      status: 200,
      message: "order ditemukan",
      data: getOffer,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const getOrderById = async ({ id_order, uuid }) => {
  try {
    const getUser = await UserRepository.findByUuid(uuid);
    if (!getUser) {
      return {
        status: 400,
        message: "User tidak ditemukan",
        data: null,
      };
    }
    const getOrder = await OrderRepository.getOrderById({
      id_order: id_order,
      uuid: uuid,
    });
    console.log(getOrder);
    if (getOrder.length === 0) {
      return {
        status: 400,
        message: "order tidak ditemukan",
        data: null,
      };
    }
    return {
      status: 200,
      message: "order ditemukan",
      data: getOrder[0],
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = {
  createOrder,
  checkOrder,
  getMyOrder,
  produkOffered,
  getOrderById,
};
