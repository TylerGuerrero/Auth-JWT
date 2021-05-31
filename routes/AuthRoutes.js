const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const { registerValidator, loginValidator } = require('../validation/CredentialValidator')
const { authCheck } = require('../middleware/AuthCheck')

router.get('/user', authCheck, async (req, res) => {
    try {
        const user =  await User.findById(req.user._id).exec()
        return res.status(200).send({user})
    } catch (err) {
        return res.status(400).send({err: err.message})
    }        
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const { error } = loginValidator(req.body)

    if (error) {
        return res.status(400).send({error: error.details[0].message})
    }

    try {
        const user = await User.login(email, password)
        const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET, {expiresIn: 3 * 24 * 60 * 60})
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60})
        return res.status(200).send({id: user._id})
    } catch (err) {
        return res.status(400).send({error: err.message})
    }
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    const { error } = registerValidator(req.body)

    if (error) {
        return res.status(400).send({error: error.details[0].message})
    }

    try {
        const user = await User.create({name, email, password})
        const token = jwt.sign({id: user._id}, process.env.TOKEN_SECRET, {expiresIn: 3 * 24 * 60 * 60})
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60})
        return res.status(200).send({id: user._id})
    } catch (err) {
        return res.status(400).send({error: err.message})
    }   
})

module.exports = router;