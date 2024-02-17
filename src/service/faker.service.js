import { getFakerDao } from "../daos/faker.dao.mock.js";


let fakerDao = getFakerDao()

class mockServices{
     create(){
        return  fakerDao.createMockProducts(100)
    }
}

export const mockService = new mockServices