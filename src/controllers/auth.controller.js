import { Router } from "express";
import { usersService } from "../service/users.service.js";


export const auth = Router()

export async function getAuthEmail (req, res,next) {
    try {
        const userId = req.params.uid
        await usersService.authenticate(userId)
        res.authenticated()
    } catch (error) {
        error.statusCode = 400
        next(error)
    }
}