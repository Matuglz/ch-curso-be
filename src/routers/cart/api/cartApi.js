import { Router } from "express";
import { CartRouter } from "./CartRouter.js";
import { crudCartProducts } from "./crudCartProducts.js";

export const cartApi = Router()

cartApi.use('/carts', CartRouter)
cartApi.use('/carts', crudCartProducts)