const request = require("supertest");
const app = require("../app/index");
// const server = require("../bin/www");
const bcrypt = require("bcrypt");
const UsersRepository = require("../app/repositories/userRepository");
describe("POST /api/v1/auth/register", () => {
  afterEach(async () => {
    console.log("jalan");
    await UsersRepository.deleteBY("testing");
  });
  it("1. should response with 200 as status code & succes create User", async () => {
    // const filePath = path.join(__dirname, "../storages/.storage");

    const payload = {
      name: "testing",
      email: "testing2s@gmail.com",
      password: "1234",
    };

    return request(app)
      .post("/api/v1/register")
      .send(payload)
      .then((res) => {
        // console.log(res._body.data);
        expect(res.statusCode).toBe(200);
        expect(res._body.data).not.toEqual(null);
        expect(res._body.data.uuid).not.toEqual(null);
        expect(res._body.data.name).toEqual(payload.name);
        expect(res._body.data.email).toEqual(payload.email);
      });
  });
  // it("2. should response with 400 as status code & Nama tidak boleh kosong", async () => {
  //   const payload = {
  //     name: "",
  //     email: "testing@gmail.com",
  //     password: "1234",
  //   };

  //   return request(app)
  //     .post("/api/v1/auth/register")
  //     .send(payload)
  //     .then((res) => {
  //       expect(res.statusCode).toBe(400);
  //       expect(res._body.data).toEqual(null);
  //       expect(res._body.message).toEqual("Nama tidak boleh kosong");
  //     });
  // });
  // it("3. should response with 400 as status code & Email tidak boleh kosong", async () => {
  //   const payload = {
  //     name: "testing",
  //     email: "",
  //     password: "1234",
  //   };

  //   return request(app)
  //     .post("/api/v1/auth/register")
  //     .send(payload)
  //     .then((res) => {
  //       expect(res.statusCode).toBe(400);
  //       expect(res._body.data).toEqual(null);
  //       expect(res._body.message).toEqual("Email tidak boleh kosong");
  //     });
  // });
  // it("4. should response with 400 as status code & Email tidak valid", async () => {
  //   const payload = {
  //     name: "testing",
  //     email: "dwadwa",
  //     password: "1234",
  //   };

  //   return request(app)
  //     .post("/api/v1/auth/register")
  //     .send(payload)
  //     .then((res) => {
  //       expect(res.statusCode).toBe(400);
  //       expect(res._body.data).toEqual(null);
  //       expect(res._body.message).toEqual("Email tidak valid");
  //     });
  // });
  // it("5. should response with 400 as status code & Password tidak boleh kosong", async () => {
  //   const payload = {
  //     name: "testing",
  //     email: "teting@gmail.com",
  //     password: "",
  //   };

  //   return request(app)
  //     .post("/api/v1/auth/register")
  //     .send(payload)
  //     .then((res) => {
  //       expect(res.statusCode).toBe(400);
  //       expect(res._body.data).toEqual(null);
  //       expect(res._body.message).toEqual("Password tidak boleh kosong");
  //     });
  // });
  // it("6. should response with 400 as status code & Email already exists", async () => {
  //   const payload = {
  //     name: "testing",
  //     email: "testing@gmail.com",
  //     password: "1234",
  //   };
  //   const payload2 = {
  //     name: "testing2",
  //     email: "testing@gmail.com",
  //     password: "1234",
  //   };

  //   await request(app).post("/api/v1/auth/register").send(payload);

  //   return request(app)
  //     .post("/api/v1/auth/register")
  //     .send(payload2)
  //     .then((res) => {
  //       expect(res.statusCode).toBe(400);
  //       expect(res._body.data).toEqual(null);
  //       expect(res._body.message).toEqual("Email already exists");
  //     });
  // });
});
