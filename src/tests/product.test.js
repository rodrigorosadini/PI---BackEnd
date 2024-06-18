const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
let server;
let token;

beforeAll(async () => {
  jest.setTimeout(30000); // Aumentar o timeout para 30 segundos;
  await mongoose.connect(process.env.MONGO_URI);

  // Iniciar o servidor antes dos testes
  server = app.listen(3001);

  await request(app).post("/api/auth/register").send({
    username: "usuarioteste",
    password: "senhateste",
  });

  const loginResponse = await request(app).post("/api/auth/login").send({
    username: "usuarioteste",
    password: "senhateste",
  });

  token = loginResponse.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  server.close(); // Fechar o servidor após os testes.
});

describe("API de Produtos", () => {
  it("deve criar um novo produto", async () => {
    const response = await request(app)
      .post("/api/produtos")
      .send({
        nome: "Produto Teste",
        preco: 100,
        descricao: "Descrição Teste",
        categoria: "Categoria Teste",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });

  it("deve obter todos os produtos", async () => {
    const response = await request(app)
      .get("/api/produtos")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("deve obter um produto por id", async () => {
    const novoProduto = await request(app)
      .post("/api/produtos")
      .send({
        nome: "Outro Produto",
        preco: 150,
        descricao: "Outra Descrição",
        categoria: "Outra Categoria",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/api/produtos/${novoProduto.body._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", novoProduto.body._id);
  });

  it("deve atualizar um produto por id", async () => {
    const novoProduto = await request(app)
      .post("/api/produtos")
      .send({
        nome: "Produto para Atualizar",
        preco: 200,
        descricao: "Descrição para Atualizar",
        categoria: "Categoria para Atualizar",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .put(`/api/produtos/${novoProduto.body._id}`)
      .send({
        nome: "Produto Atualizado",
        preco: 250,
        descricao: "Descrição Atualizada",
        categoria: "Categoria Atualizada",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("nome", "Produto Atualizado");
  });

  it("deve deletar um produto por id", async () => {
    const novoProduto = await request(app)
      .post("/api/produtos")
      .send({
        nome: "Produto para Deletar",
        preco: 300,
        descricao: "Descrição para Deletar",
        categoria: "Categoria para Deletar",
      })
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .delete(`/api/produtos/${novoProduto.body._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe("Produto deletado");
  });
});
