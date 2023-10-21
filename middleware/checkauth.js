const jwt = require('jsonwebtoken')
const { JWT_KEY_SECRET } = require('../config')


const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) {
            console.log('no token')
            res.redirect('/admin/login')
        }
        const decodedToken = jwt.verify(token, JWT_KEY_SECRET)
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        return next(error.reason)
    }
}

module.exports = {checkAuth}