import { Router } from "express"
export const updateProductRouter = Router()
import { productsManager } from "../../../db/mainDB.js"
import multer from "multer"
import { updateImgS3 } from "../../functions/awsFunctions.js"

updateProductRouter.get("/UpdateProduct", async (req, res) => {
    res.render("updateProduct.handlebars")
})
const storage = multer.memoryStorage()
const upload = multer({ storage })


updateProductRouter.put("/updateProduct",upload.single('img'), async (req, res) => {


    async function validacion(nuevo, original) {
        if (nuevo == "") {
            return original
        }
        return nuevo
    }

    try {
        const body = req.body
        //RECUPERO EL OBJETO ANTES DE ACTUALIZAR PARA LA VALIDACION
        const prodAntesDeActualizar = await productsManager.findById(body.id).lean()
        console.log(prodAntesDeActualizar);
        //ID PARA LA BUSQUEDA
        const id = { _id: body.id }
        //OBJETO CON DATOS VALIDADOS PARA LA ACTUALIZACION
        const datosActualizacion = {        
            title: await validacion(body.title, prodAntesDeActualizar.title),
            description: await validacion(body.description, prodAntesDeActualizar.description),
            price: await validacion(body.price, prodAntesDeActualizar.price),
            code: await validacion(body.code, prodAntesDeActualizar.code),
            stock: await validacion(body.stock, prodAntesDeActualizar.stock)

        }
        //SE ACTUALIZA EN LA BASE DE DATOS
        const actualizado = await productsManager.findByIdAndUpdate(id, datosActualizacion, { new: true, runValidators: true })
        //SE ACTUALIZA IMAGEN EN LOS SERIVIDORES DE S3 Y DE MONGO
        updateImgS3(req,prodAntesDeActualizar,actualizado)
        res.status(201).json({ message: 'Actualizado exitosamente' });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
})
