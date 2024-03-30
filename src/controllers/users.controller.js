import passport from "passport"
import { usersService } from "../service/users.service.js"
import { emailService } from "../service/email.service.js"

export async function registerController(req, res, next) {
    try {
        const user = await usersService.register(req.body)
        await emailService.sendEmail(user.email, user._id)
        res.created()
    }
    catch (error) {
        error.statusCode = 400
        next(error)
    }
}


export async function logOutController(req, res, next) {
   try{ await usersService.lastConnection(req.user, new Date().toString())
    req.session.destroy()
        res.logout()}
        catch(error){
            error.statusCode = 400
            next(error)
        }
}

export async function profileController(req, res, next) {
    try {
        res.json({
            user: req.user,
        })
    } catch (error) {
        error.statusCode = 400
        next(error)
    }

}


export function loginController(req, res, next) {
    passport.authenticate('loginLocal', (err, user, info) => {
        if (err) {
            err.statusCode = 400
            return next(err)
        }
        if (!user) {
            return res.status(401).json({ message: info ? info.message : 'Login failed' });
        }
        req.login(user, (error) => {
            if (error) {
                error.statusCode = 400
                return next(error);
            }
            res.loged(req.user);
        });
    })(req, res, next);
}

export async function usersRouter(req,res,next){
    try{const uid = req.params.uid
    await usersService.updateFile(uid,req.file.filename.substring(0,req.file.filename.lastIndexOf('.')), `/static/${req.body.type}/` + req.file.filename)
}catch(error){
    error.statusCode = 400
    next(error)
}
}