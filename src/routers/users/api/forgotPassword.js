import { Router } from "express";
import { usersService } from "../../../service/users.service.js";
import { randomUUID } from 'crypto'
import { emailService } from "../../../service/email.service.js";

export const forgotPassword = Router()

forgotPassword.post('/', async (req, res, next) => {
    try {
        await usersService.generateResetPwdToken(req.body.email)
        res.EmailSent()
    }
    catch (error) {
        error.status = 400
        next(error)
    }
})

// forgotPassword.get('/resetPassword/:pwdtoken',async (req,res,next)=>{
//     try{
//          await usersService.validateToken(req.params.pwdtoken, Date.now())
//          next()
//     }
//     catch(error){
//         error.status = 400
//         next(error)
//     }
// })

forgotPassword.post('/:pwdtoken', async (req, res, next) => {
    try {
        let validate = await usersService.validateToken(req.params.pwdtoken, Date.now())
        if (validate) {
            await usersService.resetPassword(req.body, req.params.pwdtoken)
            res.updated()
        }
    }
    catch (error) {
        error.status = 400
        next(error)
    }
})