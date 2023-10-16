const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();
const middleware = require("../app/middleware/authorization");
const upload = require("../app/utils/multer");
/**
 * TODO: Implement your own API
 *       implementations
 */
// apiRouter.get("/api/v1/posts", controllers.api.v1.postController.list);
// apiRouter.post("/api/v1/posts", controllers.api.v1.postController.create);
// apiRouter.put("/api/v1/posts/:id", controllers.api.v1.postController.update);
// apiRouter.get("/api/v1/posts/:id", controllers.api.v1.postController.show);
// apiRouter.delete(
//   "/api/v1/posts/:id",
//   controllers.api.v1.postController.destroy
// );

apiRouter.post("/api/v1/register", controllers.api.v1.userController.Register);
apiRouter.post(
  "/api/v1/login",
  controllers.api.v1.userController.LoginController
);
apiRouter.get(
  "/api/v1/user",
  middleware.parseToken,
  controllers.api.v1.userController.GetUserDetail
);
apiRouter.post(
  "/api/v1/user/update",
  middleware.parseToken,
  upload.any(),
  controllers.api.v1.userController.UpdateUser
);

// ===================================================
// API PRODUCT
// ===================================================
apiRouter.post(
  "/api/v1/product",
  middleware.parseToken,
  upload.any(),
  controllers.api.v1.productController.createProduct
);
apiRouter.get(
  "/api/v1/product/:limit/:offset",
  controllers.api.v1.productController.getListProduct
);
apiRouter.get(
  "/api/v1/product/:uuid",
  controllers.api.v1.productController.getProductById
);
/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
