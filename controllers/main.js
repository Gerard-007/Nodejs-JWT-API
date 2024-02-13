/**
 * >> Check username, password in post(login) request
 * >> if exists create new JWT
 * >> send back to frontend
 *
 * >> Setup authentication so only the request with JWT can access the dashboard
 */

const jwt = require('jsonwebtoken')
const {BadRequest} =  require('../errors/index')

const login = async (req, res) => {
    const {username, password} = req.body

    if (!username || !password) {
        throw new BadRequest('Please provide username/password')
    }

    const id = new Date().getDate()

    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})

    res.status(200).json({msg: "User created successfully", token: token})
}

const dashboard = async (req, res) => {
    console.log(req.user)

    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `here is your lucky number ${luckyNumber}`})
}

module.exports = {login, dashboard}