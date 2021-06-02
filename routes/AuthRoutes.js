const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const { registerValidator, loginValidator } = require('../validation/CredentialValidator')
const { authCheck } = require('../middleware/AuthCheck')
const { home_get, login_post, register_post, logout_get } = require('../controllers/AuthController')

router.get('/home', authCheck, home_get)

router.post('/login', login_post)

router.post('/register', register_post)

router.get('/logout', logout_get)

module.exports = router;