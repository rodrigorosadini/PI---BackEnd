const express = require("express");
const { registrar, login } = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: API de gerenciamento de autenticação
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *               password:
 *                 type: string
 *                 description: Senha
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Entrada inválida
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *               password:
 *                 type: string
 *                 description: Senha
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro no servidor
 */

router.post("/register", registrar);
router.post("/login", login);

module.exports = router;
