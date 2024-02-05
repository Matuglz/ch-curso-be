import { Router } from "express";
import { registerController } from "../../../controllers/users.controller.js";
import { loginRule } from "../../../middlewares/autorization.js";


export const registerRouter = Router()

registerRouter.get('/', loginRule)
registerRouter.post('/', registerController)


