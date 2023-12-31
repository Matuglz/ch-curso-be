import { mongoose } from "mongoose";
import { randomUUID } from 'node:crypto'
import { hashPassword, isValidPwd } from "../../src/functions/bcryptFunctions.js";
import { config as configDotenv } from "dotenv";
configDotenv()

const collection = 'users'

const userSchema = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, require: true, unique: true },
    password: { type: String },
    age: { type: Number },
    name: { type: String, require: true },
    lastName: { type: String },
    provider: { type: String, default: 'Local' }
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
                    console.log('body desde el model',body);
                    await mongoose.model(collection).create(body)
                }
                catch (error) {
                    throw error
                }
            },

            login: async function (email, password) {
                let datosUsuario

                const findUser = await mongoose.model(collection).findOne({ email }).lean()
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
                    email: findUser.email
                }

                if (findUser.email == process.env.ADMIN_EMAIL) {
                    datosUsuario.rol = 'Admin'
                } else {
                    datosUsuario.rol = 'User'
                }
                return datosUsuario
            }
        }
    })

export const userManager = mongoose.model(collection, userSchema)