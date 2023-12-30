export function preLoginRule(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).json({ status: 'error', message: 'necesita iniciar sesion' })
  }
  next()
}
// export function isLogin(req,res,next){
//   if(req.isAuthenticated){
//     return res.status(200).json({status: 'success', message: 'ya existe una sesion'})
//   }
//   next()
// }