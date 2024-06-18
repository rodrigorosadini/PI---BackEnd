const express = require("express");
const {
  criarProduto,
  obterProdutos,
  obterProdutoPorId,
  atualizarProduto,
  deletarProduto,
} = require("../controllers/productController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       required:
 *         - nome
 *         - preco
 *         - descricao
 *         - categoria
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente do produto
 *         nome:
 *           type: string
 *           description: O nome do produto
 *         preco:
 *           type: number
 *           description: O preço do produto
 *         descricao:
 *           type: string
 *           description: A descrição do produto
 *         categoria:
 *           type: string
 *           description: A categoria do produto
 *       example:
 *         id: d5fE_asz
 *         nome: iPhone 12
 *         preco: 799
 *         descricao: Último iPhone da Apple
 *         categoria: Eletrônicos
 */

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API para gerenciamento de produtos
 */

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Entrada inválida
 */
router.post("/", criarProduto);

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Retorna a lista de todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: A lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 */
router.get("/", obterProdutos);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 */
router.get("/:id", obterProdutoPorId);

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Entrada inválida
 *       404:
 *         description: Produto não encontrado
 */
router.put("/:id", atualizarProduto);

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
router.delete("/:id", deletarProduto);

module.exports = router;
