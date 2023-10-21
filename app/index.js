/**
 * @file Bootstrap express.js server
 * @author Fikri Rahmat Nurhidayat
 */

const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");

const port = process.env.PORT || 8000;
const app = express();
const { Server } = require("socket.io");
const http = require("http");

const cors = require("cors");
/** Install request logger */
app.use(morgan("dev"));
app.use(cors(false));
/** Install JSON request parser */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/** Install Router */
app.use(router);
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("subscribe-notification", async ({ uuid }) => {
    console.log("data " + socket.id);
    socket.join(uuid);
    await listConnectedClients();
  });

  socket.on("unsubscribe-notification", async ({ uuid }) => {
    socket.leave(uuid);
    console.log(socket.id + " unsubscribe-notificationeRoom " + uuid);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
  // listConnectedClients();
});
function listConnectedClients() {
  console.log(io);
  const connectedClients = Object.keys(io.sockets.sockets);

  console.log("Connected clients:" + connectedClients.length);
  connectedClients.forEach((socketId) => {
    console.log(`- Socket ID: ${socketId}`);
  });
}
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

module.exports = io;
