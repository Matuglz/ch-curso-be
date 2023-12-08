import express from "express";
import multer from "multer";
// import { mesageManager } from "../../db/models/mesageModel.js";

const upload = multer()

export const chatRouter = express.Router()

chatRouter.use(express.json())
chatRouter.use(upload.none())


chatRouter.get('/chat', async (req,res)=>{
    res.render('chat.handlebars')
})

// chatRouter.post('/chat', async (req,res)=>{
//     const body = req.body
//     const newMesage = await mesageManager.create(body)
//     res.status(200).json({mesage:'dou'})

// })