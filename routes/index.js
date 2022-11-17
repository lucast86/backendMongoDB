const express = require('express')
const routes = express.Router()
const { isAuth } = require('../middlewares')

const {
    userControllers
} = require('../controllers')

routes.post("/login", userControllers.login)
routes.post("/register", userControllers.register)

routes.post("/hi", isAuth, userControllers.sayHi)

module.exports = routes