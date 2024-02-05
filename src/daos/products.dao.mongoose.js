import { Schema, model, mongoose } from "mongoose";
import { randomUUID } from "node:crypto"
import mongoosePaginate from 'mongoose-paginate-v2'
import { MONGODB_ATLAS_ACCESS_STRING } from "../config/config.js";
import { cartsService } from "../service/carts.service.js";


const productSchema = new Schema({
    _id: { type: String, default: randomUUID, },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: Array, default: [] },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, default: true }
},
    {
        strict: 'throw',
        versionKey: false,

    })
productSchema.plugin(mongoosePaginate)
const productsManager = model('products', productSchema)

class productsDaoMongoose {

    async substractStock(cartId, prodId, quantity) {
        
        try {
            const product = await productsManager.findById(prodId)
            console.log('producto encontrado', product);

            if(!product || product.stock < quantity){
                throw new Error('There is not enough stock')
            }

            const newStock = product.stock - quantity

            const updateProduct = await productsManager.findOneAndUpdate(
                {_id:prodId},
                {stock:newStock},
                {new:true}).lean()

                await cartsService.deleteProductFromCart(cartId, prodId)
                updateProduct.quantity = quantity
            return updateProduct
        } catch (error){
            throw new Error(error.message)
        }
    }

    async updateImageURL(id, url) {
        try {
            if (!url) {
                throw new Error('Url dont exist')
            } else {
                await productsManager.updateOne({ _id: id }, { $push: { thumbnail: url } })
            }
        }
        catch {
            throw new Error('fail to update image url')
        }
    }

    async find(id) {
        try {
            return await productsManager.findById(id)
        } catch {
            throw new Error('fail to find product')
        }
    }

    async create(body) {
        try {
            return (await productsManager.create(body)).toObject()
        } catch (error) {
            throw new Error('fail to create the product', error.message)
        }
    }

    async delete(id) {
        try {
            return await productsManager.deleteOne({ _id: id })
        } catch {
            throw new Error('fail to delete the product')
        }
    }

    async update(id, body) {
        try {
            return await productsManager.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        } catch {
            throw new Error('fail to update the product')
        }
    }

    async read(filters, paginateOptions) {
        try {
            return await productsManager.paginate(filters, paginateOptions)
        } catch {
            throw new Error('fail to fetch products')
        }
    }
}

export async function getProductsDao() {
    let productsDao
    if (mongoose.connection.readyState === 0 || 3) {
        await mongoose.connect(MONGODB_ATLAS_ACCESS_STRING)
    }
    return productsDao = new productsDaoMongoose
}