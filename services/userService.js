const authService = require('./authService')
const User = require('../models/user')

const register = (email, password) => {

    /*
        funciones de mongo:
        User.find(): es buscar en la base de datos todos los usaurios
        User.findOne(): es consultar en la base de datos por un solo usuario
        newUser.save(): es para grabar el nuevo usuarios
    */ 
    return new Promise((resolve, reject) => {

        const newUser = new User({
            email,
            password,
        })

        User.findOne({email: newUser.email}, (error, user) => {
            if(error){
                reject({ status:500, message: `Se produjo un error al registrar un usuario ${error}`})
            }
            if(user){
                // return res.status(400).send({ message: `El email ya se encuentra en uso.`})
                reject({ status:403, message: `El email ya se encuentra en uso.`})
            }

            // const newUser = new User({ email, password})
            newUser.save((error) => {
                if(error){
                    reject({ status:500, message: `Se produjo un error al registrar un usuario ${error}`})
                }
                resolve({status: 200, message: "El usuario fue creado exitosamente", newUser})
            })
        })
    })
}

const login = () => {

}

module.exports = {
    register,
    login,
}