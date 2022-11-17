const express = require('express')
const routes = express.Router()
const { isAuth } = require('../middlewares')

const { userControllers, productControllers } = require('../controllers')

const { userSchema } = require('../controllers/schemas')


routes.post("/login", userControllers.login)
routes.post("/register", userSchema, userControllers.register)

routes.post("/hi", isAuth, userControllers.sayHi)

routes.post("/products", productControllers.createProduct)

module.exports = routes