import { Schema, model } from 'mongoose'
import { randomUUID } from 'node:crypto'
import { productsManager } from './productModel.js'

export const cartsManager = model('carts', new Schema({
    _id: { type: String, default: randomUUID },
    productos: { type: Array, default: [] }
},
    {
        strict: 'throw',
        versionKey: false,
        statics: {},
        methods: {
            async addProduct(cartId, prod, cantidad) {
                const cart = await cartsManager.findOne({ _id: cartId })
                if (cart) {
                    let existe = await productsManager.findOne({ _id: prod })
                    if (existe) {
                        const estaEnElCart = cart.productos.some((p)=> p._id === prod)
                        if (estaEnElCart) {
                            await cartsManager.updateOne({_id : cartId, 'productos._id': prod},
                           {$inc:{'productos.$.cantidad': cantidad++}})
                        } else {

                            const nuevoProducto = {_id: prod, cantidad: 1}
                            await cartsManager.updateOne(
                                { _id: cartId }, 
                                { $push: { productos: nuevoProducto} })
                        }

                    } else {
                        throw new Error(`el producto con id ${prod} no existe`)
                    }
                } else {
                    throw new Error(`el carrito con id ${cartId} no existe`)
                }
            }
        }
    }))