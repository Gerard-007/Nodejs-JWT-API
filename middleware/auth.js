const jwt = require('jsonwebtoken')
const {UnAuthenticatedError} =  require('../errors/index')


const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuthenticatedError("Invalid token provided")
    }

    const token = authHeader.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decode
        req.user = {id, username}
        next()
    } catch (error) {
        throw new UnAuthenticatedError('Not authorized access this route')
    }
}


module.exports = authMiddleware