const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { registerValidator, loginValidator} = require('../validation/CredentialValidator')

const home_get = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).exec()
        return res.status(200).send({user})
    } catch (err) {
        return res.status(400).send({err: err.message})
    }        
}

const login_post = async (req, res) => {
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
}

const register_post = async (req, res) => {
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
}

const logout_get = (req, res) => {
    res.cookie('jwt', ' ', {httpOnly: true, maxAge: 3})
    return res.status(200).send({logout: 'You are now logged out'})
}

module.exports = {
    home_get,
    login_post,
    register_post,
    logout_get
}