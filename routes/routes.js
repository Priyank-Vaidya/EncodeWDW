const express = require('express');
const router = express.Router()
// const user = require('../controllers/userController')
const todo = require('../controllers/todoController')
const {requireAuth} = require('../middlewares/auth')

// router.post('/signup', user.registerUser);
// router.post('/login', user.loginUser);

router.get("/",todo.getAll)
router.post('/post', todo.addTask);
router.get("/:userId",requireAuth, todo.getTasks);
router.post("/:userId",requireAuth,todo.addTask);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;