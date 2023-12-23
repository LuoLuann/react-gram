const express = require('express')
const router = express.Router()

// controller
// aqui to chamando as funcoes do controller
// ou seja, aquele objeto que ta sendo exportado la esta sendo
// desestruturado aqui
const { register, login, getCurrentUser, update, getUserById } = require('../controllers/UserController')

// middlewares
const validate = require('../middlewares/handleValidation')
const { userCreateValidation, loginValidation, userUpdateValidation } = require('../middlewares/userValidations')
const authGuard = require('../middlewares/authGuard')
const { imageUpload } = require('../middlewares/imageUpload')

// routes
router.post('/register', userCreateValidation(), validate, register)
router.post('/login', loginValidation(), validate, login)
router.get('/profile', authGuard, getCurrentUser)
router.put('/', authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update )
router.get("/:id", getUserById)

module.exports = router
