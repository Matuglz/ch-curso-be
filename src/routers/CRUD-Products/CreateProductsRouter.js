import { Router } from "express"
import { productsManager } from "../../../db/mainDB.js"
import { subirArchivo } from "../../awsFunctions.js";
import multer from "multer";
export const createProductsRouter = Router()

createProductsRouter.get("/createProduct", async (req, res) => {
    res.render('createProduct.handlebars')
})
const storage = multer.memoryStorage()
const upload = multer({ storage })


createProductsRouter.post("/createProduct",upload.single('img'), async (req, res) => {
    try {
        const body = req.body
        const newProduct = await productsManager.create(body)
        console.log(req.file);
        res.status(200).json({ message: "Producto agregado" })
        subirArchivo(req,newProduct)
    }
    catch (error) {
        res.status(500).json({ message: "Error al agregar producto" })
        console.log(error);
    }
})