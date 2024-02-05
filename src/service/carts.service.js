import {  getCartsDao } from "../daos/carts.dao.mongoose.js";


const cartsDao = await getCartsDao()

class cartsServices{


    async createCart(){
        return await cartsDao.create({})
    }

    async cartPopulate(user){
        return await cartsDao.populateCart(user)
    }

    async findCart(id){
        return await cartsDao.findCart(id)
    }

    async deleteCart(id){
        return await cartsDao.deleteCart(id)
    }

    async addProductToCart(cartId, prod, cantidad){
        return await cartsDao.addProduct(cartId, prod, cantidad)
    }

    async deleteProductFromCart(cartId, prodId){
        return await cartsDao.deleteProduct(cartId, prodId)
    }

    async deleteAllCartProducts(cartId){
        return await cartsDao.delAllCartProducts(cartId)
    }
}

export const cartsService = new cartsServices()