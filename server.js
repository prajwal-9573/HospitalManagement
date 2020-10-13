const express = require('express')
const server = express()
const route = require('./index')
const jwt = require('jsonwebtoken')
const config = require('./config')
class HandlerGenerator {
    login(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let mockedUsername = 'admin';
        let mockedPassword = 'password';

        if (username && password) {
            if (username === mockedUsername && password === mockedPassword) {
                let token = jwt.sign({ username: username },
                    config.secret, {
                        expiresIn: '24h' 
                    }
                );
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        } else {
            res.json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }
}
let handlers = new HandlerGenerator();
server.use(express.json())
server.post('/login', handlers.login)

const checkToken = require('./checkToken')
server.use('/api', checkToken, route)


const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://127.0.0.1:27017/HospM',{ useUnifiedTopology: true ,useNewUrlParser: true}, () => {
    console.log("connected to DB")
})


server.listen(3000, () => {
    console.log("listening to port 3000")
})
