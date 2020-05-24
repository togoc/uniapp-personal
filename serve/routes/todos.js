const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const TodoController = require('../controllers/todos')
const todoController = new TodoController()

router.get('/list', auth, todoController.getList);
router.post('/add-todo', auth, todoController.addTodo);
router.get('/toggle', auth, todoController.toggle);
router.get('/remove', auth, todoController.remove);


module.exports = router