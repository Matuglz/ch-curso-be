export function preLoginRule(req,res,next){
    if(!req.session['user']){
        return res.redirect('/Login')
    }
    next()
}