import { Router } from "express";
import { cartsManager } from "../../../db/mainDB.js";


export const getCartProducts = Router()

getCartProducts.get("/:cid", async (req,res)=>{
    const cartId = req.params.cid
    const cart = await cartsManager.findById(cartId).lean()
    res.json(cart)
})


