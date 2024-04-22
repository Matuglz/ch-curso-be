import { Router } from "express";
import { logOutController, loginController, profileController } from "../../../controllers/users.controller.js";
import { loginRule, preLoginRule } from "../../../middlewares/autorization.js";

export const sessionsRouter = Router()

sessionsRouter.get('/', loginRule)
sessionsRouter.post('/', loginController)

sessionsRouter.get('/current', preLoginRule ,profileController)

sessionsRouter.delete('/Current', logOutController)