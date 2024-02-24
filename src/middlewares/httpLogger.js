import { logger } from "../utils/logger.js";

export function httpLogger(req,res,next){
    logger.info(`[${req.method}] ${req.path}`)
    next()
}