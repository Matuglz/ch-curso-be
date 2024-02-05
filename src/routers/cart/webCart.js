import { Router } from "express";
import { usersService } from "../../service/users.service.js";
import { cartsService } from "../../service/carts.service.js";


export const webCarts = Router()

webCarts.get('/cart/:cid', async (req, res) => {
    const cart = await cartsService.cartPopulate(req.params.cid)
    res.render('cart.handlebars',
        { products: cart.articles })
})