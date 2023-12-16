import { Router } from "express";
import { cartsManager } from "../../../db/mainDB.js";
import { inspect } from 'util'

export const CartRouter = Router();


CartRouter.post("/", async (req, res) => {
    const body = req.body
    await cartsManager.create(body)
    res.json({ "creado:": true })
})

CartRouter.get("/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid
        const cart = await cartsManager.findById(cartId).populate('productos._id').lean()

        if (!cart || !cart.productos) {
            return res.status(404).json({ error: 'Carrito no encontrado o productos no disponibles' })
        }

        res.render('cart.handlebars', {
            pageTitle: 'cart',
            prods: cart.productos
        });

    } catch (error) {
        console.error(error)
        res.status(500).send('error al recuperar los productos del carrito')
    }
});
