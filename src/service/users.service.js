import { getUsersDao } from "../daos/users.dao.mongoose.js";


const usersDao = await getUsersDao()

class usersServices {
    async register(body) {
        return await usersDao.register(body)
    }

    async login(email, password) {
        return await usersDao.login(email, password)
    }

    async userPopulate(email) {
        return await usersDao.allPopulate(email)
    }

    async authenticate(id) {
        return await usersDao.authEmail(id)
    }

    async changeRol(email) {
        return await usersDao.modifyRol(email)
    }

    async generateResetPwdToken(email) {
        return await usersDao.generatePwdToken(email)
    }

    async validateToken(token, date) {
        return await usersDao.validateTokenAndDate(token, date)
    }

    async resetPassword(body, token) {
        return await usersDao.changePassword(body.password, token)
    }

    async lastConnection(user, date) {
        return await usersDao.updateConnection(user, date)
    }

    async updateFile(uid, type, url) {
        return await usersDao.newFile(uid, type, url)
    }

    async getUsersInfo() {
        return await usersDao.getUsersInfo()
    }

    async getUserData(uid){
        return await usersDao.getUser(uid)
    }

    async deleteMany(users){
        return await usersDao.deleteManyUsers(users)
    }

    async deleteOne(email){
        return await usersDao.deleteUser(email)
    }
}

export const usersService = new usersServices()