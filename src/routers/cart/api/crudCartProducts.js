import { Router } from "express";
import { addProductsToCart, deleteAllCartProducts, deleteCartProduct, updateProductQuantityController } from "../../../controllers/carts.controller.js";
export const crudCartProducts = Router()


//AGREGAR PRODUCTOS AL CARRITO
crudCartProducts.post("/:cid/product/:pid", addProductsToCart)

//BORRAR 1 PRODUCTO DEL CARRITO
crudCartProducts.delete('/:cid/product/:pid', deleteCartProduct)

//BORRAR TODOS LOS PRODUCTOS DEL CARRITO
crudCartProducts.delete('/:cid', deleteAllCartProducts)

//MODIFICAR CANTIDAD DEL CARRITO
crudCartProducts.put('/current', updateProductQuantityController)