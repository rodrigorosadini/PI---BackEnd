const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index"); // ajuste conforme necessário

describe("Product API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create a new product", async () => {
    const response = await request(app).post("/api/products").send({
      name: "Test Product",
      price: 100,
      description: "Test Description",
      category: "Test Category",
    });
    expect(response.status).toBe(201);
  });

  it("should get all products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
  });

  // Adicione mais testes conforme necessário
});
