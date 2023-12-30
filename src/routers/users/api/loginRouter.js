import { Router } from "express";
import passport from "passport";
import { preLoginRule } from '../../../middlewares/autorization.js'

export const loginRouter = Router()


loginRouter.post('/',
    passport.authenticate('loginLocal', { failWithError: true }),
    async (req, res, next) => {
        res.status(204).json({ status: 'success', message: 'login success' })
    },
    (error, req, res, next) => {
        res.status(401).json({ status: 'error', message: error.message })
    }
)

loginRouter.get('/current', preLoginRule, (req, res) => {
    res.json(req.user)
})


loginRouter.delete('/Current', async (req, res) => {
    req.session.destroy(err => {
        res.status(204).json({ status: 'success' })
    })
})