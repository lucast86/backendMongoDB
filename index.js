const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

app.use(express.json())

dotenv.config()

app.use('/api', routes)


mongoose.connect(process.env.MONGO_BD, {useNewUrlParser: true}, (error, respone) => {
    if (error) {
        console.log(`Error al conectar a la base de datos ${error}`);
    }
    console.log("Conexión a la base de datos establecida");
    
    app.listen(process.env.PORT, () => {
        console.log(`Conectado al Puerto ${process.env.PORT}`);
    })
}); 


// models/user min 1:19 es diferente