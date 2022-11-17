const { productService } = require('../services')

const createProduct = async (req, res) => {
    //  destructuramos los parametros del req.body 
    try{
        const { name, price, stock, userId } = req.body 
        const result = await productService.createProduct( name, price, stock, userId )
        res.status(201).send(`Se creo el nuevo producto ${result.name} su valor es de: ${result.price}`)
    }catch(error){
        console.log(error);
        res.status(500).send("Se produjo un error al grabar el producto")
    }
   
}

module.exports = {
    createProduct,
}