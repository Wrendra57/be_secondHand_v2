const cloudinary = require("./cloudinaryConfig");

const uploadImage = async ({ image }) => {
  try {
    console.log(image);
    const fileBase64 = image.buffer.toString("base64");
    const file = `data:${image.mimetype};base64,${fileBase64}`;
    const upload = await cloudinary.uploader.upload(file);

    return upload;
  } catch (error) {
    console.log("error uploading");
  }
};

module.exports = uploadImage;
