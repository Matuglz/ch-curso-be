import { Router } from "express"
import { preLoginRule } from "../middlewares/autorization.js"
import { emailService } from "../service/email.service.js"

export const email = Router()

email.post('/email',async (req,res)=>{
    try{
        let text = `http://localhost:8080/api/AuthEmail/${req.user._id}`

        await emailService.sendEmail(req.user.email,'authentification',text)
    }catch(error){
       error.statusCode = 400
       next(error)
    }
})