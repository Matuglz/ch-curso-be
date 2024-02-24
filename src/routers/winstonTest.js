import { Router } from "express";
import { logger } from "../utils/logger.js";

export const winstonTest = Router()

winstonTest.get('/loggerTest', (req, res) => {
    try {
        logger.error('testing winston logger')
        logger.warn('testing winston logger')
        logger.info('testing winston logger')
        logger.http('testing winston logger')
        logger.verbose('testing winston logger')
        logger.debug('testing winston logger')
        logger.silly('testing winston logger')
        res.status(200).json({message:'testing success'})
    }
    catch (error) {
        error.message = 'error testing loggers'
        error.statusCode = 400
        next(error)
    }
})