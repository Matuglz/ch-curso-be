import { cartsService } from "../service/carts.service.js"
import { productsService } from "../service/products.service.js"
import { ticketSerice } from "../service/ticket.service.js"

//CREATE CARTS
export async function createCart(req, res, next) {
    try {
        const cart = await cartsService.createCart()
        res.created(cart)
    } catch (error) {
        next(error)
    }
}

//GET CARTS
export async function getCarts(req, res, next) {
    try {
        const cartId = req.params.cid
        const cart = await cartsService.findCart(cartId)
        res.result(cart)
    }
    catch (error) {
        next(error)
    }
}


//AGREGAR PRODUCTOS AL CARRITO
export async function addProductsToCart(req, res, next) {
    try {
        const cartId = req.params.cid
        const product = req.params.pid
        const cart = await cartsService.addProductToCart(cartId, product, 1)
        res.result(cart)
    }
    catch (error) {
        next(error)
    }
}

//DELETE CART PRODUCTS

export async function deleteCartProduct(req, res, next) {
    try {
        const cartId = req.params.cid
        const prodId = req.params.pid
        await cartsService.deleteProductFromCart(cartId, prodId)
        res.deleted()
    } catch (error) {
        next(error)
    }
}

// DELETE ALL PRODUCTS FROM CART

export async function deleteAllCartProducts(req, res, next) {
    try {
        const cartId = req.params.cid
        await cartsService.deleteAllCartProducts(cartId)
        res.deleted()
    }
    catch (error) {
        next(error)
    }
}

//BUY CART

export async function buyCartController(req, res, next) {
    try {
        let boughtProducts = []


        const cart = await cartsService.cartPopulate(req.params.cid)
        for (const p of cart.articles) {
            try {
                const product = await productsService.removeStock(req.params.cid, p._id._id, p.cantidad)
                boughtProducts.push({ productId: product._id, quantity: product.quantity, price: product.price })
            }
            catch (error) {
                console.log(error.message);
            }
        }

        let ticketPrice = boughtProducts.reduce((acc, val) => acc + val.quantity * val.price, 0)
        const ticket = await ticketSerice.makeTicket({
            products: boughtProducts,
            amount: ticketPrice,
            pucharser: 'matias@gmail.com'

        })
        res.bought()
    }
    catch (error) {
        next(error)
    }
}