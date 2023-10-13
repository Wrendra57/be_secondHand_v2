/**
 * @file Bootstrap express.js server
 * @author Fikri Rahmat Nurhidayat
 */

const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");
const port = process.env.PORT || 8000;
const app = express();
const cors = require("cors");
/** Install request logger */
app.use(morgan("dev"));
app.use(cors(false));
/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/** Install Router */
app.use(router);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

module.exports = app;
