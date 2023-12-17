import { Router } from "express";
import { userManager } from "../../../../db/mainDB.js";
import { config as configDotenv } from "dotenv";
configDotenv()

export const loginRouter = Router()

loginRouter.post('/', async(req,res)=>{
    const findUser = await userManager.findOne(req.body)
    if(!findUser){
        res.status(401).json({status: 'error', message:'login failed'})
    }   
        
    req.session['user']={
        name: findUser.name,
        lastName: findUser.lastName,
        age: findUser.age,
        email:findUser.email
    }

    if(findUser.email == process.env.ADMIN_EMAIL){
        req.session['user'].rol = 'Admin'
    }else{
        req.session['user'].rol= 'User'
    }
    console.log(req.session['user']);
    res.status(201).json({status: 'success'})
})

loginRouter.delete('/Current', async (req, res) => {
    req.session.destroy(err => {
      res.status(204).json({ status: 'success' })
    })
  })