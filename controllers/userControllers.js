const User = require('../models/user')
const { authService } = require('../services')
// const { userService } = require('../services')

const register = (req, res) => {

    const { email, password } = req.body 
    
    /*
        funciones de mongo:
        User.find(): es buscar en la base de datos todos los usaurios
        User.findOne(): es consultar en la base de datos por un solo usuario
        newUser.save(): es para grabar el nuevo usuarios
    */ 
    User.findOne({ email }, (error, user) => {
    
        if(user){
            return res.status(400).send({ message: `El email ya se encuentra en uso.`})
        }

        const newUser = new User({ email, password})
        newUser.save((error) => {
            if(error){
            return res.status(500).send({ message: `Se produjo un error al registrar un usuario`, error}) 
            }
            res.status(200).send({ message: "El usuario fue creado exitosamente", newUser})
        })
    })
    // userService.register()
    
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
