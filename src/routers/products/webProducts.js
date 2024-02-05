import { Router } from "express";
import { readProductsController } from "../../controllers/products.controller.js";


export const webProducts = Router()

webProducts.get('/', readProductsController)

webProducts.get('/createProduct', (req, res) => { res.render('createProduct.handlebars') })

webProducts.get('/updateProduct', (req, res) => { res.render('updateProduct.handlebars') })

webProducts.get('/deleteProduct', (req, res) => { res.render('deleteProduct.handlebars') })