import { getUsersDao } from "../daos/users.dao.mongoose.js";


const usersDao = await getUsersDao()

class usersServices{
    async register(body){
        return await usersDao.register(body)
    }

    async login(email,password){
        return await usersDao.login(email,password)
    }

    async userPopulate(email){
        return await usersDao.allPopulate(email)
    }

    async authenticate(id){
        return await usersDao.authEmail(id)
    }
}

export const usersService = new usersServices()