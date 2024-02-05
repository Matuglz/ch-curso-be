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

    async deleteProduct(id){
        return await productsDao.delete(id)
    }

    async updateProduct(id, updateOptions){
        return await productsDao.update(id, updateOptions)
    }

    async fetchProducts(filters,paginateOptions){
        return await productsDao.read(filters,paginateOptions)
    }
}

export const productsService = new productsServices()