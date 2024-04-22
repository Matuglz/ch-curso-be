import { Router } from "express";
import { buyCartController, createCart, getCarts } from "../../../controllers/carts.controller.js";
import { preLoginRule } from "../../../middlewares/autorization.js";


export const CartRouter = Router();


CartRouter.post("/", createCart)

CartRouter.get("/:cid", getCarts)

CartRouter.post('/:cid/purchase',preLoginRule, buyCartController)
