import { Router } from "express";
import { preLoginRule } from "../../middlewares/preLoginRule.js";

export const webRouter = Router()

webRouter.get('/Register' , (req,res)=>{
    res.render('register.handlebars')
})

webRouter.get('/Login' , (req,res)=>{
    res.render('login.handlebars')
})

webRouter.get('/Profile', preLoginRule,(req,res)=>{
    res.render('profile.handlebars',{
        ...req.session['user']
    })
})
