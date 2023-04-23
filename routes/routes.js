const express = require('express');
const router = express.Router()
const {signUpuser,loginUser} = require('../controllers/userController')
const {getAll,getTasks,addTask} = require('../controllers/todoController')
const {requireAuth} = require('../middlewares/auth')

router.post('/signup', signUpuser);
router.post('/login', loginUser);

router.get("/",getAll)
router.get("/:userId",requireAuth, getTasks)
router.post("/:userId",requireAuth,addTask)

module.exports = router;