const Joi = require('@hapi/joi')

const registerValidator = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(body)
}

const loginValidator = (body) => {
   const schema = Joi.object({
       email: Joi.string().min(6).required(),
       password: Joi.string().min(6).required()
   })

   return schema.validate(body)
}   

module.exports = {
    registerValidator,
    loginValidator
}