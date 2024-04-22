import { Router } from "express";
import { usersService } from "../../../service/users.service.js";

export const premiumUserRouter = Router()

premiumUserRouter.post('/:uem', async(req, res,next)=>{
   try{ 
    let email = req.params.uem
    await usersService.changeRol(email)
    res.updated()
}catch(error){
    error.status = 400
    next(error)
}
})