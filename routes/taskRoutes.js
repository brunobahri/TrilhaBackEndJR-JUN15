const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate'); // Middleware de autenticação

router.post('/', authenticate, taskController.createTask);
router.get('/', authenticate, taskController.getTasks);
router.put('/:id', authenticate, taskController.updateTask);
router.delete('/:id', authenticate, taskController.deleteTask);

module.exports = router;
