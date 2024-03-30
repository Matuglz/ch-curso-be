import { Schema, model, mongoose } from "mongoose";
import { randomUUID } from "node:crypto"
import mongoosePaginate from 'mongoose-paginate-v2'
import { cartsService } from "../service/carts.service.js";


const productSchema = new Schema({
    _id: { type: String, default: randomUUID, },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: Array, default: [] },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, default: true },
    owner: { type: String, default: 'admin' }
},
    {
        strict: false,
        versionKey: false,

    })
productSchema.plugin(mongoosePaginate)
const productsManager = model('products', productSchema)

class productsDaoMongoose {

    async substractStock(cartId, prodId, quantity) {

        try {
            const product = await productsManager.findById(prodId)


            if (product.stock < quantity) {
                throw new Error(`There is not enough stock of ${product.title}`)
            }

            const newStock = product.stock - quantity

            const updateProduct = await productsManager.findOneAndUpdate(
                { _id: prodId },
                { stock: newStock },
                { new: true }).lean()

            await cartsService.deleteProductFromCart(cartId, prodId)
            updateProduct.quantity = quantity
            return updateProduct
        } catch (error) {
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
            return await productsManager.create(body)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async delete(id, user) {
        try {
            let findProduct = await productsManager.findOne({ _id: id })
            if (findProduct.owner === user._id || user.rol === "admin") {
                return await productsManager.deleteOne({ _id: id })
            } else {
                throw new Error('only the user who create the product can delete or an admin')
            }
        } catch(error) {
            throw new Error(error.message)
        }
    }

    async update(id, body, user) {
        try {
            const findProduct = await productsManager.findOne({_id : id})
            if(findProduct.owner !== user._id || user.rol !== 'admin'){
                throw new Error('only the user who create the product can update or an admin')
            }else{
                return await productsManager.findByIdAndUpdate(id, body, { new: true, runValidators: true })
            }
        } catch(error){
            throw new Error(error.message)
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
    return productsDao = new productsDaoMongoose
}