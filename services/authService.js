const jwt = require('jwt-simple')
const { DateTime } = require('luxon')

const createToken = (user) => {
    const payload = {
        sub: user.id,
        iat: DateTime.now().toMillis(),
        exp: DateTime.now().plus({ day: 14}).toMillis()
    };

    return jwt.encode(payload, process.env.SECRET_TOKEN)
}

// const decoteToken = (token) => {
//     const decode = new Promise((resolve, reject) => {
//         try{
//             const payload = jwt.decode(token, process.env.SECRET_TOKEN)

//             if(payload.exp <= DateTime.now().toMillis()){
//                 reject({
//                     status: 401,
//                     message: "El token ha expirado"
//                 })
//             }

//             resolve(payload.sub)

//         } catch(error) {
//             reject({
//                 status: 500,
//                 message: "Invalid token"
//             })
//         }
//     })
// }

const decoteToken = async (token) => {
    try{
        const payload = jwt.decode(token, process.env.SECRET_TOKEN);

        if(payload.exp <= DateTime.now().toMillis()){
            return {status: 401, message: "el token a expirado" }
        }
        return payload.sub
        
        }catch(error){ 
            console.log(error);
        }
}

module.exports = {
    createToken,
    decoteToken,
}