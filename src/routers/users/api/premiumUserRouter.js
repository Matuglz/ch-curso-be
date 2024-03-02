import { Router } from "express";
import { usersService } from "../../../service/users.service.js";

export const premiumUserRouter = Router()

premiumUserRouter.post('/:uid', async(req, res)=>{
   try{ 
    let id = req.params.uid
    await usersService.changeRol(id)
    res.updated()
}catch(error){
    error.status = 400
    next(error)
}
})