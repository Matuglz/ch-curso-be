import { Router } from "express";
import { sessionsRouter } from "./sessionsRouter.js";
import { authRouter } from "./authRouter.js";
import { premiumUserRouter } from "./premiumUserRouter.js";
import { forgotPassword } from "./forgotPassword.js";
import { upload } from "../../../config/multer.config.js";
import { usersDocsRouter } from "../../../controllers/users.controller.js";
import {usersRouter} from './usersRouter.js'


export const apiUsers = Router()

apiUsers.use('/Users',usersRouter)
apiUsers.use('/Sessions', sessionsRouter)
apiUsers.use('/AuthEmail', authRouter)
apiUsers.use('/Premium', premiumUserRouter)
apiUsers.use('/ForgotPassword', forgotPassword)
apiUsers.use('/Users/:uid/documents',upload.single('file'), usersDocsRouter)