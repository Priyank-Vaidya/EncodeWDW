const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController');
const todoController = require('../controllers/todoController');
const auth = require('../middlewares/auth')

router.post('/signup', userController.signUpuser);
router.post('/login', userController.loginUser);

router.get('/', auth, todoController.getAll);
router.get('/:userid', auth, todoController.getTasks);
router.post('/:userid', auth, todoController.addTask);