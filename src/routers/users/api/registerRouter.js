import { Router } from "express";
import { userManager } from "../../../../db/mainDB.js";

export const registerRouter = Router()

registerRouter.post('/', async (req, res) => {
    try {
        console.log(req.body);
        await userManager.register(req.body)
        res.status(201).json({ status: 'success', message: 'register complete' })
    }
    catch (error) {
        res.status(400).json({ status: 'error', message: error.message })
    }
})


