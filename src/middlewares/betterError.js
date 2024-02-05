export function betterErrors(err,req, res, next) {
  let code = err.statusCode
res.status(code).json({
  status:'error',
  message: err.message
})
}