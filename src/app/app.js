import { CartRouter } from "../routers/cart/api/CartRouter.js"
import { crudCartProducts } from "../routers/cart/api/crudCartProducts.js"
import { chatRouter } from "../routers/chatRouter.js"
import express from "express"
import handlebars from 'express-handlebars'

import { Server } from "socket.io"

import { webRouter } from "../routers/users/webRouter.js"
import { apiUsers } from "../routers/users/api/apiUsers.js"
import { sessions } from "../middlewares/sessions.js"
import { passportInitialize, passportSession } from "../middlewares/authentication.js"
import { betterResponse } from "../middlewares/betterResponse.js"
import { crudProducts } from "../routers/products/crudProducts.js"
import { webProducts } from "../routers/products/webProducts.js"
import { cartApi } from "../routers/cart/api/cartApi.js"
import { webCarts } from "../routers/cart/webCart.js"



export const app = express()
app.engine('handlebars', handlebars.engine())
app.set("views", "views")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/static", express.static("./static"))
app.use(sessions)
app.use(passportInitialize, passportSession)
app.use(betterResponse)

app.use(webProducts)
app.use(crudProducts)
app.use(chatRouter)
app.use('/api',apiUsers)
app.use('/api', cartApi)
app.use(webCarts)
app.use(webRouter)




// const PORT = 8080
// const server = app.listen(PORT, () => {
//     console.log(`se inicio servidor en el puerto ${PORT}`);
// })
// export const io = new Server(server)


// io.on('connection', (socket) => {
//     console.log('Un usuario se ha conectado')

//     socket.on('request-messages', async () => {
//         try {
//             const data = await mesageManager.find().lean()
//             socket.emit('messages', { contenido: data })
//         } catch (error) {
//             console.error(error)
//         }
//     })


//     socket.on('send-message', async (message) => {
//         try {
//              await mesageManager.create(message)
//             const updatedMessages = await mesageManager.find().lean()
//             io.emit('messages', { contenido: updatedMessages })
//         } catch (error) {
//             console.error(error)
//         }
//     })

//     socket.on('request-products', async()=>{
//         try{
//             const products = await productsManager.find().lean()
//             io.emit('products', {container: products})
//         }catch(error){
//             console.error(error);
//         }
//     })
// })

