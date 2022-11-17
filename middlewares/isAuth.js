const { authService } = require("../services")

const isAuth = (req, res, next) => {
         
        console.log(req.headers.authorization);
        if(!req.headers.authorization){
            return res.status(401).send({ message: "El usuario no esta logueado!"})
        }

        const token = req.headers.authorization.split(" ")[1]

        authService.decoteToken(token).then((result) => {
            req.user = result
            next()
        }).catch((error) => {
            console.log(error);
            return res.status(500).send({ message: "Se produjo un error al validar el token"})
        })
}

        
module.exports = isAuth