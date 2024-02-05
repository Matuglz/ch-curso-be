import { Router } from "express";
import { usersService } from "../../../service/users.service.js";
import { preLoginRule } from "../../../middlewares/autorization.js";


export const authRouter = Router()

authRouter.get('/:uid',preLoginRule, async (req, res,next) => {
    try {
        const userId = req.params.uid
        await usersService.authenticate(userId)
        req.user.auth = true
        res.authenticated()
    } catch (error) {
        error.statusCode = 400
        next(error)
    }
})