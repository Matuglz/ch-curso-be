import passport from "passport"
import { usersService } from "../service/users.service.js"

export async function registerController(req, res, next) {
    try {
        const user = await usersService.register(req.body)
        res.created(user)
    }
    catch (error) {
        next(error)
    }
}


export async function logOutController(req, res, next) {

        req.session.destroy(err => {
            next(err)
            res.logout()
        })
}

export async function profileController(req, res, next) {
    try {
        res.json({
            user: req.user,
        })
    } catch (error) {
        next(error)
    }

}

// export function loginController(req, res, next) {
//     try {
//         passport.authenticate('loginLocal', { failWithError: true })
//         console.log(req.user);
//         res.loged(req.user)
//     }
//     catch (error) {
//         next(error)
//     }

// }


export function loginController(req, res, next) {
    passport.authenticate('loginLocal', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).json({ message: info ? info.message : 'Login failed' });
        }
        req.login(user,(error) => {
            if (error) {
                return next(error);
            }
            res.loged(req.user);
        });
    })(req, res, next);
}