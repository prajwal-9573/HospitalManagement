const jwt = require('jsonwebtoken')
const config = require('./config')
const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token']
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: 'Your access token is not valid'
                })
            } else {
                req.decoded = decoded;
                next();
            }
        })
        
    } else {
        return res.status(422).send({
            message: 'Could not find the Auth Token'
        });
    }
};

module.exports = checkToken