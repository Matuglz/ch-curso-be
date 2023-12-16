import { Router } from "express";
import { productsManager } from "../../../db/mainDB.js";

export const ProductsRenderRouter = Router()

ProductsRenderRouter.get("/", async (req, res) => {
    try {
        const filters = {}
        if (req.query.query) { filters.push({ title: req.query.query }) }

        const paginateOptions = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            lean: true
        }

        const products = await productsManager.paginate(filters, paginateOptions)
        res.render("home.handlebars",{
            title: 'Productos',
            ...products
        })
    } catch (error) {
        res.status(500).send(error)
    }
})