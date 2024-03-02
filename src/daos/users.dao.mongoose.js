import { mongoose } from "mongoose";
import { randomUUID } from 'node:crypto'
import { hashPassword, isValidPwd } from "../../src/functions/bcryptFunctions.js";
import { cartsService } from "../../src/service/carts.service.js";
import { emailService } from "../service/email.service.js";

const collection = 'users'

const userSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, required: true, unique: true },
    authEmail: { type: Boolean, default: false },
    password: { type: String },
    age: { type: Number },
    name: { type: String, required: true },
    lastName: { type: String },
    provider: { type: String, default: 'Local' },
    cart: { type: String, ref: 'carts', required: true },
    rol: { type: String, default: 'user' },
    resetPasswordToken:{type:String},
    resetPasswordExpires:{type:String}

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
                    return await mongoose.model(collection).create(body)

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
                    _id: findUser._id,
                    name: findUser.name,
                    lastName: findUser.lastName,
                    age: findUser.age,
                    email: findUser.email,
                    cart: findUser.cart,
                    auth: findUser.authEmail,
                    rol: findUser.rol
                }

                return datosUsuario
            },
            allPopulate: async function (email) {

                const cartProductsPopulate = await cartsService.cartPopulate(email)
                const userPopulate = await mongoose.model(collection).findOne({ email: email }).populate('cart').lean()
                userPopulate.cart = cartProductsPopulate
                return userPopulate
            },
            changeRol: async function (id) {
                try {
                    let findUser = await mongoose.model(collection).findOne({ _id: id })
                    if (!findUser) {
                        throw new Error(`user doesn't exist`)
                    }

                    if (findUser.rol === 'premium') {
                        await mongoose.model(collection).findOneAndUpdate({ _id: id }, { $set: { rol: 'user' } })
                    }
                    if (findUser.rol === 'user') {
                        await mongoose.model(collection).findOneAndUpdate({ _id: id }, { $set: { rol: 'premium' } })
                    }
                } catch (error) {
                    throw new Error(error.message)
                }
            }
        }
    })

const userManager = mongoose.model(collection, userSchema)

class usersDaoMongoose {
    async register(body) {
        // const user = await userManager.findOne({email: body.email})
        return await userManager.register(body)
    }

    async login(email, password) {
        // const user = await userManager.findOne({email: email})
        return await userManager.login(email, password)
    }

    async allPopulate(email) {
        return await userManager.allPopulate(email)
    }

    async authEmail(id) {
        return await userManager.findOneAndUpdate({ _id: id }, { authEmail: true })
    }

    async modifyRol(id) {
        return await userManager.changeRol(id)
    }

    async caca(email) {
        let user = await userManager.findOne({ email: email })
        if (!user) {
            throw new Error(`user doesn't exist`)
        }
        let passwordToken = randomUUID()
        let expires = Date.now() + 3600000

        user.resetPasswordToken = passwordToken
        user.resetPasswordExpires = expires
        await user.save()

        let resetLink = `http://localhost:8080/api/ForgotPassword/${passwordToken}`
        await emailService.sendResetPasswordEmail(email, resetLink)
    }

    async validateTokenAndDate(token, date) {
        let user = await userManager.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: date }
        })
        if (!user) {
            throw new Error('token is invalid or expire')
        } else {
            return user
        }
    }

    async changePassword(password, token) {
        await userManager.findOneAndUpdate({ resetPasswordToken: token }, { $set: { password: hashPassword(password) } })
    }

}

export async function getUsersDao() {
    let usersDao
    return usersDao = new usersDaoMongoose
}