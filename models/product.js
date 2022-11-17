const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {type: String, unique: true, lowercase : true, requerid: true},
    price: {type: Number, requerid: true},
    stock: {type: Number, requerid: true},
    userOwner: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Product', ProductSchema)

