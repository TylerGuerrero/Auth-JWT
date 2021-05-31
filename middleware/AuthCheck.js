const { verify, decode } = require('jsonwebtoken')

const authCheck = (req, res, next) => {
    const token = req.cookies.jwt
    // const jwt = req.header('jwt)

    if (!jwt) return res.status(400).send("Token does not exist")

    try {
        const verified = verify(token, process.env.TOKEN_SECRET)

        if (verified) {
            const decodedToken = decode(token)
            console.log(decodedToken)
            req.user = verified
            next()
        } else {    
            res.status(400).send({err: "token is not verified"})
        }
    } catch (err) {
        res.status(400).send({err: err.message})
    }
}

module.exports = {
    authCheck
}