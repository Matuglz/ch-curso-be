import { updateProductRouter } from "./routers/CRUD-Products/updateProductsRouter.js"
import { createProductsRouter } from "./routers/CRUD-Products/CreateProductsRouter.js"
import { deleteProductRouter } from "./routers/CRUD-Products/DeleteProductsRouter.js"
import { CartRouter } from "./routers/cart/CartRouter.js"
import { getCartProducts } from "./routers/cart/getCartProductsRouter.js"
import { AddProductsToCart } from "./routers/cart/AddProductToCartRouter.js"
import { ProductsRenderRouter } from "./routers/ProductsRenderRouter.js"
import { chatRouter } from "./routers/chatRouter.js"

import express from "express"
import handlebars from 'express-handlebars'
import { Server } from "socket.io"
import { mesageManager, productsManager } from "../db/mainDB.js"


const app = express()
app.engine('handlebars', handlebars.engine())
app.set("views", "views")
app.use(express.json())
app.use("/static", express.static("./static"))

app.use(ProductsRenderRouter)
app.use(updateProductRouter)
app.use(createProductsRouter)
app.use(deleteProductRouter)
app.use(chatRouter)
app.use("/api/carts/", AddProductsToCart)
app.use("/api/carts/", getCartProducts)
app.use("/api/carts/", CartRouter)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`se inicio servidor en el puerto ${PORT}`);
})
export const io = new Server(server)


io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado')

    socket.on('request-messages', async () => {
        try {
            const data = await mesageManager.find().lean()
            socket.emit('messages', { contenido: data })
        } catch (error) {
            console.error(error)
        }
    })


    socket.on('send-message', async (message) => {
        try {
             await mesageManager.create(message)
            const updatedMessages = await mesageManager.find().lean()
            io.emit('messages', { contenido: updatedMessages })
        } catch (error) {
            console.error(error)
        }
    })

    socket.on('request-products', async()=>{
        try{
            const products = await productsManager.find().lean()
            io.emit('products', {container: products})
        }catch(error){
            console.error(error);
        }
    })
})

app.get('/', async (req,res)=>{
    res.json(await productsManager.find().lean())
})