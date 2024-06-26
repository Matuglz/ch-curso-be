import { Schema, model, mongoose } from 'mongoose'
import { randomUUID } from 'node:crypto'
import mongoosePaginate from 'mongoose-paginate-v2'
import { productsService } from '../service/products.service.js'

const cartsSchema = new Schema({
    _id: { type: String, default: randomUUID },
    articles: [
        {
            _id: { type: String, ref: 'products' },
            cantidad: { type: Number }
        }, { type: Array, default: [] }
    ]
},
    {
        strict: 'throw',
        versionKey: false,
        statics: {},
        methods: {
            addProducts: async function (cartId, prod, cantidad) {
                const cart = await cartsManager.findOne({ _id: cartId })
                if (cart) {
                    let existe = await productsService.findProduct(prod)
                    if (existe) {
                        const estaEnElCart = cart.articles.some((p) => p._id === prod)
                        if (estaEnElCart) {
                            await cartsManager.updateOne({ _id: cartId, 'articles._id': prod },
                                { $inc: { 'articles.$.cantidad': cantidad++ } })
                        } else {
                            await cartsManager.updateOne(
                                { _id: cartId },
                                { $push: { articles: { _id: prod, cantidad: 1 } } }
                            );
                        }
                    } else {
                        throw new Error(`el producto con id ${prod} no existe`)
                    }
                } else {
                    throw new Error(`el carrito con id ${cartId} no existe`)
                }
            },

            deleteProduct: async function (cartId, prodId) {
                const cart = await cartsManager.findById(cartId).lean()
                const prods = cart.articles
                const prodExist = await prods.find((p) => p._id === prodId)
                if (prodExist) {
                    const prodsWithoutProdId = prods.filter((p) => p._id !== prodId)
                    await cartsManager.updateOne({ _id: cart._id }, { $set: { articles: prodsWithoutProdId } })
                }
                else {
                    throw new Error(`el producto con id ${prodId} no esta en el carrito`)
                }
            }
        }
    }
)
cartsSchema.plugin(mongoosePaginate)
export const cartsManager = model('carts', cartsSchema)

class cartsDaoMongoose {
    async create() {
        return (await cartsManager.create({}))
    }

    async populateCart(cartId) {
        return await cartsManager.findOne({ _id: cartId }).populate({ path: 'articles._id', model: 'products' }).lean()
    }

    async findCart(id) {
        return await cartsManager.findOne({ _id: id }).lean()
    }

    async deleteCart(id) {
        return await cartsManager.deleteOne({ _id: id }).lean()
    }

    async addProduct(cartId, prod, cantidad, user) {
        try {
            let product = await productsService.findProduct(prod)
            if (product.owner === user._id) {
                throw new Error('if you create the product cant add to your cart')
            } else {
                const cart = await cartsManager.findOne({ _id: cartId })
                return await cart.addProducts(cartId, prod, cantidad)
            }
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async deleteProduct(cartId, prodId) {
        const cart = await cartsManager.findOne({ _id: cartId })
        if (cart) {
            await cart.deleteProduct(cartId, prodId)
        } else {
            throw new Error(`cart with id ${cartId} dont exist`)
        }
    }

    async delAllCartProducts(cartId) {
        const cart = await cartsManager.findOne({ _id: cartId })
        if (cart) {
            await cartsManager.updateOne({ _id: cartId }, { $set: { articles: [] } })
        } else {
            throw new Error(`cart with id ${cartId} dont exist`)
        }
    }

    async addProductQuantity(cartId, prodId){
        {let cart = await cartsManager.findOne({_id:cartId})
            if(!cart){
                throw new Error ('this cart doesnt exist')
            }else{
                let prod = await productsService.findProduct(prodId)
                    if(!prod){
                        throw new Error('this product doesnt exist')
                    }
            }
        
       await cartsManager.updateOne(
            {_id: cartId, 'articles._id': prodId},
            {$inc:{'articles.$.cantidad': 1}}
        )
    }}

    async lessProductQuantity(cartId, prodId){
        {let cart = await cartsManager.findOne({_id:cartId})
            if(!cart){
                throw new Error ('this cart doesnt exist')
            }else{
                let prod = await productsService.findProduct(prodId)
                    if(!prod){
                        throw new Error('this product doesnt exist')
                    }
            }
            
        let cartProd = cart.articles.find(a => a._id === prodId)

        if(cartProd.cantidad === 1){
            (await getCartsDao()).deleteProduct(cartId, prodId)
        }else{
            await cartsManager.updateOne(
                {_id: cartId, 'articles._id': prodId},
                {$inc:{'articles.$.cantidad': -1}}
            )
        }
    }}
}



export async function getCartsDao() {
    let cartsDao
    return cartsDao = new cartsDaoMongoose
}