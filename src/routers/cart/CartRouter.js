import { Router } from "express";
import { cartsManager } from "../../../db/mainDB.js";

export const CartRouter = Router();

CartRouter.post("/", async (req, res)=>{
    const body = req.body
    await cartsManager.create(body)
    res.json({"creado:":true})
})

CartRouter.get("/", async(req,res)=>{
    res.json(await cartsManager.find())
})