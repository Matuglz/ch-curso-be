import { Router } from "express"
import multer from 'multer'
import { createProductController, deleteProductController, updateProductsController } from "../../controllers/products.controller.js"
import { onlyAdmins } from "../../middlewares/autorization.js"


const storage = multer.memoryStorage()
const upload = multer({ storage })

export const crudProducts = Router()


crudProducts.post('/createProduct', onlyAdmins, upload.single('img'), createProductController)
crudProducts.get('/createProduct/current', onlyAdmins)

crudProducts.get('/deleteProduct/current', onlyAdmins)
crudProducts.delete('/deleteProduct', onlyAdmins, deleteProductController)

crudProducts.get('/updateProduct/current', onlyAdmins)
crudProducts.put('/updateProduct', upload.single('img'), updateProductsController)
