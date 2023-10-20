const ProductRepository = require("../repositories/productRepository");
const uploadImage = require("../utils/uploader");
const UserRepository = require("../repositories/userRepository");
const ImagePhotoRepository = require("../repositories/imagePhotoRepository");
const createProduct = async ({
  name_product,
  category,
  price,
  description,
  stock,
  files,
  uuid,
}) => {
  try {
    if (name_product === "" || !name_product) {
      return {
        status: 400,
        message: "Nama produk tidak boleh kosong",
        data: null,
      };
    }
    if (category === "" || !category) {
      return {
        status: 400,
        message: "Kategori produk tidak boleh kosong",
        data: null,
      };
    }
    if (price === "" || !price) {
      return {
        status: 400,
        message: "Harga produk tidak boleh kosong",
        data: null,
      };
    }
    if (description === "" || !description) {
      return {
        status: 400,
        message: "Deskripsi produk tidak boleh kosong",
        data: null,
      };
    }
    if (stock === "" || !stock) {
      return {
        status: 400,
        message: "Stok produk tidak boleh kosong",
        data: null,
      };
    }
    if (files.length === 0 || files.length > 4) {
      return {
        status: 400,
        message: "Foto produk minimal 1 atau maksimal 4",
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

    const createProduct = await ProductRepository.createProduct({
      name_product,
      category,
      price: parseInt(price),
      description,
      stock: parseInt(stock),
      id_seller: uuid,
    });

    console.log(createProduct);
    if (!createProduct) {
      return {
        status: 400,
        message: "Gagal mendaftar produk",
        data: null,
      };
    }

    // const foto = await files.map(async (file, index) => {
    //   console.log(index);
    //   const upload = await uploadImage({ image: file });
    //   const createFoto = await ImagePhotoRepository.createPhoto({
    //     url: upload.secure_url,
    //     id_product: createProduct.id_product,
    //   });
    //   // await das.push(createFoto.url);
    //   return createFoto.url;
    // });
    const foto = [];
    for (let i = 0; i < files.length; i++) {
      const upload = await uploadImage({ image: files[i] });
      const createFoto = await ImagePhotoRepository.createPhoto({
        url: upload.secure_url,
        id_product: createProduct.id_product,
      });
      foto.push(createFoto.url);
    }

    if (foto.length !== files.length) {
      const deleting = await ImagePhotoRepository.deleteAllPhoto(
        createProduct.id_product
      );
      const deleteProduct = await ProductRepository.destroyProduct(
        createProduct.id_product
      );
      return {
        status: 400,
        message: "Gagal upload foto",
        data: null,
      };
    }

    return {
      status: 200,
      message: "Sukses mendaftar produk",
      data: createProduct,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: error.message,
      data: null,
    };
  }
};

const getListProduct = async ({ limit, offset }) => {
  try {
    if (!limit) {
      return {
        status: 400,
        message: "limit tidak boleh kosong",
        data: null,
      };
    }
    if (!offset) {
      return {
        status: 400,
        message: "offset tidak boleh kosong",
        data: null,
      };
    }
    const getProduct = await ProductRepository.getListProduct({
      limit: limit,
      offset: (offset - 1) * limit,
    });

    if (getProduct.length === 0) {
      return {
        status: 200,
        message: "produk tidak ditemukan",
        data: getProduct,
      };
    }
    return {
      status: 200,
      message: "success get product",
      data: getProduct,
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: 400,
      message: error.message,
      data: null,
    };
  }
};

const getProductById = async (id_product) => {
  try {
    if (!id_product) {
      return {
        status: 400,
        message: "id product tidak boleh kosong",
        data: null,
      };
    }

    const getProduct = await ProductRepository.getProductById(id_product);

    if (!getProduct || getProduct.length === 0) {
      return {
        status: 400,
        message: "Produk tidak ditemukan",
        data: null,
      };
    }
    return {
      status: 200,
      message: "sukses get product",
      data: getProduct[0],
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: 400,
      message: error.message,
      data: null,
    };
  }
};
const getListProductBySeller = async ({ uuid, offset }) => {
  try {
    console.log(offset);
    if (!uuid) {
      return {
        status: 400,
        message: "user id tidak boleh kosong",
        data: null,
      };
    }
    const getUser = await UserRepository.findByUuid(uuid);
    console.log(getUser);
    if (!getUser) {
      return {
        status: 400,
        message: "User tidak ditemukan",
        data: null,
      };
    }
    const getProduct = await ProductRepository.getProductSeller({
      uuid: uuid,
      offset: offset,
    });

    if (getProduct.length === 0) {
      return {
        status: 400,
        message: "produk tidak ditemukan",
        data: null,
      };
    }
    return {
      status: 200,
      message: "success get product",
      data: getProduct,
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: 400,
      message: error.message,
      data: null,
    };
  }
};
module.exports = {
  getProductById,
  getListProduct,
  createProduct,
  getListProductBySeller,
};
