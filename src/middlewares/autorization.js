export function preLoginRule(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ status: 'error', message: 'necesita iniciar sesion' })
  }
  next()
}

export function loginRule(req, res, next) {
    if (req.isAuthenticated()) {
      return res.status(401).json({ status: 'error', message: 'ya iniciaste sesion' })
    }
    next()
  }

export function onlyAdmins(req,res,next){

  if(!req.isAuthenticated()){
    return res.status(401).json({ status: 'error', message: 'necesita iniciar sesion' })
  }

  if(req.user.rol !== 'admin'){
    return res.status(401).json({status:'error', message:'solo los admins o premium pueden acceder a esta pagina'})
  }
  next()
}
