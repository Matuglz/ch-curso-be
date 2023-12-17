import { Router } from "express";
import { userManager } from "../../../../db/mainDB.js";

export const registerRouter = Router()

registerRouter.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const newUser = await userManager.create(req.body)
        res.status(201).json({
            status: 'success',
            payload: newUser.toObject()
        })

    } catch (error) {
        res.status(400).json('error', error)
    }
})

