import { logger } from "../utils/logger.js"

export function betterErrors(err, req, res, next) {
  let code = err.statusCode
  logger.warn(`[${req.method}] - ${req.path} - message: ${err.message}`)
  res.status(code).json({
    status: 'error',
    message: err.message
  })
}