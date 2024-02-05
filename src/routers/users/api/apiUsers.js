import { Router } from "express";
import { registerRouter } from "./registerRouter.js";
import { loginRouter } from "./loginRouter.js";
import { authRouter } from "./authRouter.js";


export const apiUsers = Router()

apiUsers.use('/Register',registerRouter)
apiUsers.use('/Login', loginRouter)
apiUsers.use('/AuthEmail', authRouter)