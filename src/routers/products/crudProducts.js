import { Router } from "express"
import { createProductController, deleteProductController, updateProductsController,getProductsController } from "../../controllers/products.controller.js"
import { onlyAdmins } from "../../middlewares/autorization.js"


export const crudProducts = Router()

crudProducts.get('/api/products', getProductsController)

crudProducts.post('/createProduct',onlyAdmins, createProductController)
crudProducts.get('/createProduct/current', onlyAdmins)

crudProducts.get('/deleteProduct/current', onlyAdmins)
crudProducts.delete('/deleteProduct', onlyAdmins, deleteProductController)

crudProducts.get('/updateProduct/current', onlyAdmins)
crudProducts.put('/updateProduct', updateProductsController)
