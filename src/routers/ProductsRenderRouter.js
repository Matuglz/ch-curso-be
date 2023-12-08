import { Router } from "express";

export const ProductsRenderRouter = Router()

ProductsRenderRouter.get("/Products", async (req,res)=>{
    res.render("home.handlebars")
})