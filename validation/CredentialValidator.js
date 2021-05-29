const Joi = require('@hapi/joi')

const registerValidator = (body) => {
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }

    return Joi.valid(body, schema)
}

const loginValidator = (body) => {
    const schema = {
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    }

    return Joi.valid(body, schema)
}   

module.exports = {
    registerValidator,
    loginValidator
}