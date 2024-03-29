import { getProductsDao } from "../daos/products.dao.mongoose.js"


const productsDao = await getProductsDao()

class productsServices{

    async removeStock(cartId, prodId, quantity){
        return await productsDao.substractStock(cartId,prodId, quantity)
    }

    async updateImgURL(id, url){
        await productsDao.updateImageURL(id,url)
    }

    async findProduct(id){
        return await productsDao.find(id)
    }

    async createProduct(body){
        return await productsDao.create(body)
    }

    async deleteProduct(id,user){
        return await productsDao.delete(id,user)
    }

    async updateProduct(id, updateOptions,user){
        return await productsDao.update(id, updateOptions,user)
    }

    async fetchProducts(filters,paginateOptions){
        return await productsDao.read(filters,paginateOptions)
    }
}

export const productsService = new productsServices()