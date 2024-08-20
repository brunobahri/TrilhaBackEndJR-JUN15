const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: API para gerenciamento de usuários
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
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
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Usuário já existe ou erro de validação
 */
router.post('/register', userController.createUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Usuários]
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/user/logout:
 *   get:
 *     summary: Realiza o logout do usuário
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */
router.get('/logout', userController.logout);

module.exports = router;
