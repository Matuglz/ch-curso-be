import { Router } from "express";
import { getAllUsersController, registerController, deleteInactiveUsersController, deleteOneUserController } from "../../../controllers/users.controller.js";
import { onlyAdmins } from "../../../middlewares/autorization.js";




export const usersRouter = Router()

usersRouter.get('/AllUsers', getAllUsersController)

usersRouter.post('/', registerController)

usersRouter.delete('/', deleteInactiveUsersController)

usersRouter.delete('/DeleteUser/:uem',onlyAdmins, deleteOneUserController)

