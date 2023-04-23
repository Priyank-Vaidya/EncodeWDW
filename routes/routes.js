const express = require('express');
const router = express.Router()
const {signUpuser,loginUser} = require('../controllers/userController')
const {getAll,getTasks,addTask} = require('../controllers/todoController')
const auth = require('../middlewares/auth')

router.post('/signup', signUpuser);
router.post('/login', loginUser);

router.get("/",getAll)
router.get('/:userid', auth, getTasks);
router.post('/:userid', auth, addTask);

module.exports = router;