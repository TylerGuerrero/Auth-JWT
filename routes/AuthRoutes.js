const router = require('express').Router();
const User = require('../models/User')

const { registerValidator, loginValidator } = require('../validation/CredentialValidator')

router.get('/register', (req, res) => {
    res.send('register')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { error } = loginValidator(req.body)

    if (error) {
        return res.status(400).send({error: error.details[0].message})
    }

    try {
        const user = User.login(email, password);
        return res.status(200).send({user: user})
    } catch (err) {
        return res.status(400).send({error: err})
    }
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const { error } = registerValidator(req.body)

    if (error) {
        return res.status(400).send({error: error.details[0].message})
    }

    try {
        const user = await User.create({name, email, password})
        return res.status(200).send({user})
    } catch(err) {
        return res.status(400).send({err})
    }   
})

module.exports = router;