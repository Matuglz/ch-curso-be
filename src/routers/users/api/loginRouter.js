import { Router } from "express";
import { logOutController, loginController, profileController } from "../../../controllers/users.controller.js";
import { loginRule, preLoginRule } from "../../../middlewares/autorization.js";

export const loginRouter = Router()

loginRouter.get('/', loginRule)
loginRouter.post('/', loginController)

loginRouter.get('/current', preLoginRule ,profileController)

loginRouter.delete('/Current', logOutController)