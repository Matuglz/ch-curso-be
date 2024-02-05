import { mongoose } from "mongoose";
import { randomUUID } from 'node:crypto'
import { hashPassword, isValidPwd } from "../../src/functions/bcryptFunctions.js";
import { cartsService } from "../../src/service/carts.service.js";
import { MONGODB_ATLAS_ACCESS_STRING } from "../config/config.js";

const collection = 'users'

const userSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    age: { type: Number },
    name: { type: String, required: true },
    lastName: { type: String },
    provider: { type: String, default: 'Local' },
    cart: {type:String, ref:'carts', required: true}
},
    {
        strict: 'throw',
        versionKey: false,
        statics: {
            register: async function (body) {
                try {
                    let email = body.email
                    const findEmail = await userManager.findOne({ email }).lean()
                    if (findEmail) {
                        throw new Error('Ya existe una cuenta con ese email registrado')
                    }

                    if (body.password) {
                        body.password = hashPassword(body.password)
                    }
                    const cart = await cartsService.createCart({})
                    body.cart = cart._id
                    await mongoose.model(collection).create(body)
                }
                catch (error) {
                    throw error
                }
            },

            login: async function (email, password) {
                let datosUsuario

                const findUser = await mongoose.model(collection).findOne({ email })
                if (!findUser) {
                    throw new Error('Email incorrecto')
                }

                if (!isValidPwd(password, findUser)) {
                    throw new Error('Contraseña incorrecta')
                }

                datosUsuario = {
                    name: findUser.name,
                    lastName: findUser.lastName,
                    age: findUser.age,
                    email: findUser.email, 
                    cart: findUser.cart                   
                }

                if (findUser.email == process.env.ADMIN_EMAIL) {
                    datosUsuario.rol = 'Admin'
                } else {
                    datosUsuario.rol = 'User'
                }
                return datosUsuario
            },
            allPopulate: async function(email){

                    const cartProductsPopulate = await cartsService.cartPopulate(email)
                    const userPopulate = await mongoose.model(collection).findOne({email: email}).populate('cart').lean()
                    userPopulate.cart = cartProductsPopulate
                    return userPopulate
            }
        }
    })

const userManager = mongoose.model(collection, userSchema)

class usersDaoMongoose{
    async register(body){
        // const user = await userManager.findOne({email: body.email})
        return await userManager.register(body)
    }

    async login(email, password){
        // const user = await userManager.findOne({email: email})
        return await userManager.login(email, password)
    }

    async allPopulate(email){
        return await userManager.allPopulate(email)
    }

}

export async function getUsersDao() {
    let usersDao
    if(mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3){
        await mongoose.connect(MONGODB_ATLAS_ACCESS_STRING)
    }
    return usersDao = new usersDaoMongoose
}