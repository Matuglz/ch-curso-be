import { Router } from "express";
import { registerRouter } from "./registerRouter.js";
import { loginRouter } from "./loginRouter.js";
import { authRouter } from "./authRouter.js";
import { premiumUserRouter } from "./premiumUserRouter.js";
import { forgotPassword } from "./forgotPassword.js";
import { upload } from "../../../config/multer.config.js";
import { usersRouter } from "../../../controllers/users.controller.js";


export const apiUsers = Router()

apiUsers.use('/Users/:uid/documents',upload.single('file'), usersRouter)
apiUsers.use('/Register',registerRouter)
apiUsers.use('/Login', loginRouter)
apiUsers.use('/AuthEmail', authRouter)
apiUsers.use('/Premium', premiumUserRouter)
apiUsers.use('/ForgotPassword', forgotPassword)