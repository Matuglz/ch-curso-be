import { Router } from "express";
import { cartsManager } from "../../../db/mainDB.js";
// import { cm } from "../../carts-manager.js";
export const crudCartProducts = Router()

//AGREGAR PRODUCTOS AL CARRITO
crudCartProducts.post("/:cid/product/:pid", async (req, res) => {
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

//BORRAR 1 PRODUCTO DEL CARRITO
crudCartProducts.delete('/:cid/product/:pid', async (req,res)=>{
    const cartId =  req.params.cid
    const prodId = req.params.pid
    const cart = await cartsManager.findOne({_id:cartId})

    if(cart){
        try{
            
            cart.deleteProduct(cartId,prodId)
            res.status(200).send('listo')
        }
        catch(error){
         console.log('error', error);
        }
    }
})

//BORRAR TODOS LOS PRODUCTOS DEL CARRITO
crudCartProducts.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid
    try {
        const cart = await cartsManager.findOne({ _id: cartId })
        if (cart) {
            await cartsManager.updateOne({ _id: cart.id }, { $set: { productos: [] } })
            res.status(200).send('carrito vaciado')
        }

    } catch (error) {
        console.log('error', error);
    }
})