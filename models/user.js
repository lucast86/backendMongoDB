// contiene la conexion a mongoBD 
const mongoose = require('mongoose')
const Schema = mongoose.Schema   //propiedad de mongoose
const bcrypt =require('bcrypt-nodejs')


// esquema de la BD caracteris'ticas de aca atributo 
const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true, required: true},
    password: {type: String, select: true, required: true},
    registerDate: {type: Date, default: Date.now()},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

// en este callback "pre"(save) antes de grabar vamos a encriptar el password 
UserSchema.pre("save", function(next) {

    let user = this   
    // if(!user.isModified('passsword')){
    //     console.log("hola")
    //     return next()
    // }


    // bcrypt.genSalt encriptamos el password 
    bcrypt.genSalt(10, (error, salt) => {
        if(error){
            return next(error)
        }
        bcrypt.hash(user.password, salt, null, (error, hash) => {
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function(password) {
    let user = this
    return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model('User', UserSchema)