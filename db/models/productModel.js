import { Schema, model } from "mongoose";
import { randomUUID } from "node:crypto"


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

export const productsManager = model('products', productSchema)