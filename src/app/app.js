import express from "express"

import { MONGODB_ATLAS_ACCESS_STRING } from "../config/config.js"
import mongoose from "mongoose"

import handlebars from 'express-handlebars'

import { sessions } from "../middlewares/sessions.js"
import { passportInitialize, passportSession } from "../middlewares/authentication.js"

import swaggerUiExpress from 'swagger-ui-express'
import { swaggerOptions } from "../utils/swagger.js"

import { webRouter } from "../routers/users/webRouter.js"
import { apiUsers } from "../routers/users/api/apiUsers.js"
import { betterResponse } from "../middlewares/betterResponse.js"
import { crudProducts } from "../routers/products/crudProducts.js"
import { webProducts } from "../routers/products/webProducts.js"
import { cartApi } from "../routers/cart/api/cartApi.js"
import { webCarts } from "../routers/cart/webCart.js"
import { betterErrors } from "../middlewares/betterError.js"
import { mockRouter } from "../routers/mock/mock.router.js"
import { httpLogger } from "../middlewares/httpLogger.js"




export const app = express()


//CONNECT DATABASE MONGODB ATLAS
await mongoose.connect(MONGODB_ATLAS_ACCESS_STRING)

//FROM HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set("views", "views")

//FROM EXPRESS
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static("./static"))

//FROM PASSPORT AND SESSIONS
app.use(sessions)
app.use(passportInitialize, passportSession)

//FROM ME
app.use(httpLogger)
app.use(betterResponse)
app.use(webProducts)
app.use(crudProducts)
app.use('/api',apiUsers)
app.use('/api', cartApi)
app.use(webCarts)
app.use(webRouter)
app.use(mockRouter)
app.use('/api-docs',swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerOptions) )


app.use(betterErrors)
