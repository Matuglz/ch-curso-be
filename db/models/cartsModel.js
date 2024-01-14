import { Schema, model } from 'mongoose'
import { randomUUID } from 'node:crypto'
import { productsManager } from './productModel.js'
import mongoosePaginate from 'mongoose-paginate-v2'

const cartsSchema = new Schema({
    _id: { type: String, default: randomUUID },
    articles: [
        {
            _id: { type: String, ref:'products'},
            cantidad: { type: Number}
        }, {type:Array, default: []}
    ]
},
    {
        strict: 'throw',
        versionKey: false,
        statics: {},
        methods: {
            addProduct: async function (cartId, prod, cantidad) {
                const cart = await cartsManager.findOne({ _id: cartId })
                if (cart) {
                    let existe = await productsManager.findOne({ _id: prod })
                    if (existe) {
                        const estaEnElCart = cart.productos.some((p) => p._id === prod)
                        if (estaEnElCart) {
                            await cartsManager.updateOne({ _id: cartId, 'productos._id': prod },
                                { $inc: { 'productos.$.cantidad': cantidad++ } })
                        } else {
                            await cartsManager.updateOne(
                                { _id: cartId },
                                { $push: { productos: { _id: prod, cantidad: 1 } } }
                            );       }                    
                    } else {
                        throw new Error(`el producto con id ${prod} no existe`)
                    }
                } else {
                    throw new Error(`el carrito con id ${cartId} no existe`)
                }
            },

            deleteProduct: async function (cartId, prodId) {
                const cart = await cartsManager.findById(cartId).lean()
                if (cart) {
                    const prods = cart.productos
                    const prodExist = await prods.find((p) => p._id === prodId)
                    if (prodExist) {
                        const prodsWithoutProdId = prods.filter((p) => p._id !== prodId)
                        await cartsManager.updateOne({ _id: cart._id }, { $set: { productos: prodsWithoutProdId } })
                    }
                    else {
                        throw new Error(`el producto con id ${prodId} no esta en el carrito`)
                    }
                }
                else {
                    throw new Error(`el carrito con id ${cartId} no existe`)
                }
            }
        }
    })
cartsSchema.plugin(mongoosePaginate)
    export const cartsManager = model('carts', cartsSchema) 