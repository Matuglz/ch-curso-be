import { Router } from "express";
import { mockGetController } from "../../controllers/mock.controller.js";

export const mockRouter = Router()

mockRouter.get('/mockingproducts', mockGetController)

