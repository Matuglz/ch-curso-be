import { validate } from "../functions/utils.js";
import { emailService } from "../service/email.service.js";
import { productsService } from "../service/products.service.js";
import { usersService } from "../service/users.service.js";

export async function createProductController(req, res, next) {
    try {
        req.body.owner = req.user._id
        const newProduct = await productsService.createProduct(req.body)
        res.created(newProduct)
    } catch (error) {
        error.statusCode = 400
        next(error)
    }
}


export async function deleteProductController(req, res, next) {
    try {

        let id = req.body.id
        let product = await productsService.findProduct(id)
        let ownerUser = await usersService.getUserData(product.owner)

        if(ownerUser.typeOfUser == 'premium'){
            await emailService.sendProductDeletedWarning(ownerUser.email, 
                `Tu producto '${product.title}' ha sido eliminado de la tienda por el administrador.`
                )
        }
        
        const productDeleted = await productsService.deleteProduct(id, req.user)

        res.deleted(productDeleted)
    } catch (error) {
        error.statusCode = 400
        next(error)
    }
}


export async function readProductsController(req, res, next) {
    try {
        const filters = {}
        if (req.query.query) { filters.push({ title: req.query.query }) }

        const paginateOptions = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            lean: true
        }

        const products = await productsService.fetchProducts(filters, paginateOptions)
        res.render("home.handlebars", {
            user: req.user,
            title: 'Productos',
            ...products
        })
    } catch (error) {
        error.statusCode = 400
        next(error)
    }
}


export async function updateProductsController(req, res, next) {
    try {
        const body = req.body
        //RECUPERO EL OBJETO ANTES DE ACTUALIZAR PARA LA VALIDACION
        const prodBeforeUpdate = await productsService.findProduct(body.id)
        //ID PARA LA BUSQUEDA
        const id = { _id: body.id }
        //OBJETO CON DATOS VALIDADOS PARA LA ACTUALIZACION
        const updateData = {
            title: await validate(body.title, prodBeforeUpdate.title),
            description: await validate(body.description, prodBeforeUpdate.description),
            price: await validate(body.price, prodBeforeUpdate.price),
            code: await validate(body.code, prodBeforeUpdate.code),
            stock: await validate(body.stock, prodBeforeUpdate.stock),

        }
        //SE ACTUALIZA EN LA BASE DE DATOS
        const prodUpdated = await productsService.updateProduct(id, updateData, req.user)
        res.updated(prodUpdated)
    }
    catch (error) {
        error.statusCode = 400
        next(error)
    }
}

export async function getProductsController(req, res, next){
try{
    let products = await productsService.fetchProducts()
     res.result(products.docs)
}catch(error){
    error.statusCode = 400
    next(error)
}
}