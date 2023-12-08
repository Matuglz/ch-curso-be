import { Router } from "express";
import { cartsManager } from "../../../db/mainDB.js";
// import { cm } from "../../carts-manager.js";
export const AddProductsToCart = Router()

AddProductsToCart.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const product = req.params.pid
        const cart = await cartsManager.findOne({ _id: cartId })
        if (cart) {
            await cart.addProduct(cartId, product, 1)
            res.status(201).json({agregado: `prod agregado al carrito`})
        }
        else {
            res.status(404).json({ error: `No existe el carrito con id: ${cartId}` });
        }

    } catch (error){
        console.error(error)
        const product = req.params.pid
        res.status(500).json({ error: `Ocurrió un error al agregar el producto con id: ${product}` });
    
    }
})
