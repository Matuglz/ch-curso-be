import { mockService } from "../service/faker.service.js";

export function mockGetController(req,res,next){
    try{
        const products = mockService.create()
        res.created(products)
    }catch(error){
        error.status = 400
        next(error)
    }
}