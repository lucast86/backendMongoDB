const authService = require('../services/authService')
const User = require('../models/user')
const { userService } = require('../services')
const { validationResult } = require('express-validator')

const register = async (req, res) => {
    try{
        const resultValidationReq = validationResult(req)
        const hasErrors = !resultValidationReq.isEmpty()
        const { email, password } = req.body

        if(hasErrors){
            return res.status(400).send(resultValidationReq)
        }

        const result = await userService.register(email, password).catch()
        res.status(200).send(result)

    }catch(error){
        res.status(500).send(error)
    }
    
    
}

const login = (req, res) => {
    // const email = req.body.email  manera estandar
    const { email, password } = req.body  // con destructuracion

    // validacion si el req. contiene el atributo email 
    if(!email){
        return res.status(400).send({ message: 'El campo email es requerido!!'})
    }

    // buscamos en la BD si existe un usuario con este email 
    User.findOne({ email }, (error, user) => {
        if(error){
            return res.status(500).send({ message: `Se produjo un error`, error}) 
        }
        if(!user){//TODO terminar
            return res.status(404).send({ message: `No se encontro el usuario con el email ingresado.`})
        }
        if(!(password && user.comparePassword(password))){
            return res.status(401).send({ message: `El usuario o la clave son incorrectos.`})
        }
        res.status(200).send({ message: "Te has logueado correctamente", token: authService.createToken(user)})
    })
}

const sayHi = (req, res) => {
    res.status(200).send("Hola usuario con id " + req.user)
}

module.exports = {
    login,
    register,
    sayHi,
}
