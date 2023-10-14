const multer = require("multer");
const storage = multer.memoryStorage(); // Store file data in memory
const upload = multer({ storage });
module.exports = upload;
