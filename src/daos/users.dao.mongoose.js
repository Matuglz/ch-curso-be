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
    documents: [{
        _id: { type: String, default: randomUUID },
        name: { type: String, required: true },
        url: { type: String, required: true }
    }],
    last_connection: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: String }

},
    {
        strict: 'throw',
        versionKey: false,
        statics: {
            register: async function (body) {
                try {
                    let email = body.email
                    const findEmail = await userManager.findOne({ email })
                    if (findEmail) {
                        throw new Error('Ya existe una cuenta con ese email registrado')
                    }

                    if (body.password) {
                        body.password = hashPassword(body.password)
                    }
                    const cart = await cartsService.createCart({})
                    body.cart = cart._id
                    return await userManager.create(body)

                }
                catch (error) {
                    throw new Error(error)
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
            changeRol: async function (email) {
                try {
                    let findUser = await mongoose.model(collection).findOne({ email: email })
                    if (!findUser) {
                        throw new Error(`user doesn't exist`)
                    }
                    // if (!findUser.documents.some(doc => doc.name === 'address') || !findUser.documents.some(doc => doc.name === 'identification')) {
                    //     throw new Error('you need complete the documentation to update to premium')
                    // }
                    if (findUser.rol === 'user') {
                        await mongoose.model(collection).findOneAndUpdate({ email: email }, { $set: { rol: 'premium' } })
                    } else {
                        await mongoose.model(collection).findOneAndUpdate({ email: email }, { $set: { rol: 'user' } })
                    }
                } catch (error) {
                    throw new Error(error.message)
                }
            },
            updateConnection: async function (user, date) {
                try {
                    if (!user) {
                        throw new Error(`user isn't logged`)
                    }
                    await mongoose.model(collection).findOneAndUpdate({ email: user.email }, { $set: { last_connection: date } })
                }
                catch (error) {
                    throw new Error(error.message)
                }
            }
        }
    })

const userManager = mongoose.model(collection, userSchema)

class usersDaoMongoose {
    async register(body) {
        return await userManager.register(body)
    }

    async login(email, password) {
        return await userManager.login(email, password)
    }

    async allPopulate(email) {
        return await userManager.allPopulate(email)
    }

    async authEmail(id) {
        return await userManager.findOneAndUpdate({ _id: id }, { authEmail: true })
    }

    async modifyRol(email) {
        return await userManager.changeRol(email)
    }

    async generatePwdToken(email) {
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

    async updateConnection(user, date) {
        await userManager.updateConnection(user, date)
    }

    async newFile(uid, type, url) {

        await userManager.findOneAndUpdate({ _id: uid }, {
            $push: {
                documents: {
                    name: type,
                    url: url
                }
            }
        })
    }

    async getUsersInfo() {
        let usersInfo = []
        let users = await userManager.find()
        users.forEach(user => {
            usersInfo.push({
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                typeOfUser: user.rol,
                cart: user.cart,
                rol: user.rol,
                last_connection: user.last_connection ?? 'too much time'
            })
        });
        return usersInfo
    }

    async getUser(uid) {
        let user = await userManager.findOne({ _id: uid })
        let userData = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            typeOfUser: user.rol,
            cart: user.cart,
            last_connection: user.last_connection ?? 'too much time'
        }
        return userData
    }

    async deleteManyUsers(users) {
        if (users.length == 0) {
            throw new Error('dont have inactive users')
        } else {
            users.forEach(async (u) => {
                await userManager.deleteOne({ email: u.email })
                await cartsService.deleteCart(u.cart)
            })
        }
    }

    async deleteUser(email) {
        if (!email) {
            throw new Error('dont send email')
        }
        let user = await userManager.findOne({ email: email })
        if (!user) {
            throw new Error('this user doesnt exist')
        } else {
            await userManager.deleteOne({ email: email })
        }
    }
}

export async function getUsersDao() {
    let usersDao
    return usersDao = new usersDaoMongoose
}