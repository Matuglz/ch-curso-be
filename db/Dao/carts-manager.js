import fs from "fs/promises"
import { pm } from "./products-manager.js"
import * as uniqueID from 'fast-unique-id'

const prods = await fs.readFile("db/products.json")
const prodsArray = JSON.parse(prods)


const carts = await fs.readFile("db/carts.json")
const cartsArray = JSON.parse(carts)

class Cart {
    constructor({ id, productos }) {
        this.id = id
        this.productos = productos

    }
}

class Producto {
    constructor(prodId, cantidad) {
        this.id = prodId
        this.quantity = cantidad
    }
}

class CartManager {
    async saveCarts() {
        await fs.writeFile("src/db/carts.json", `${JSON.stringify(this.carts)}`)
    }

    newID() {
        let id = uniqueID.fast()
        return id
    }

    constructor(carts = cartsArray || []) {
        this.carts = carts
    }

    newProduct(prodId, quantity) {
        return { id: prodId, quantity: quantity }
    }


    async newCart() {
        const id = this.newID()
        const productos = []
        const newCart = new Cart(
            {
                id,
                productos
            }
        )
        this.carts.push(newCart)
        this.saveCarts()
    }

    async addProduct(cartId, prod, cantidad) {
        const cart = cm.carts.find(c => c.id === cartId)
        if (cart) {
            let existe = prodsArray.find((p) => p.id === prod)
            if (existe) {
                let cart = cm.carts.find((c) => c.id === cartId)
                let estaEnElCart = cart.productos.find(p => p.id === prod)
                if (estaEnElCart) {
                    estaEnElCart.quantity++
                    this.saveCarts()
                } else {
                    // let producto = cm.newProduct
                    cart.productos.push(cm.newProduct(prod, cantidad))
                    pm.updateProductQuantityById(prod, cantidad)
                    this.saveCarts()
                }
            } else {
                throw new Error(`el producto con id ${prod} no existe`)
            }
        } else {
            throw new Error(`el carrito con id ${cartId} no existe`)
        }
    }

    async productsById(id) {
        let cart = this.carts.find((c) => c.id === id)
        return cart.productos
    }

    async deleteCarts(){
        this.carts = []
        this.saveCarts()
    }
}

export const cm = new CartManager


