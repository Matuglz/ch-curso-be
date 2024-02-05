import { Router } from "express";
import passport from "passport";

export const webRouter = Router()

webRouter.get('/Register', (req, res) => {
    res.render('register.handlebars')
})

webRouter.get('/Login', (req, res) => {
    res.render('login.handlebars')
})

webRouter.get('/githubLogin', passport.authenticate('loginGithub'))
webRouter.get('/githubCallback', passport.authenticate('loginGithub',{
    successRedirect:'/Profile',
    failureRedirect:'/Login'
}))

webRouter.get('/auth/google', passport.authenticate('loginGoogle', {scope: ['profile','email']}))
webRouter.get('/auth/google/callback', passport.authenticate('loginGoogle',{
    successRedirect: '/Profile',
    failureRedirect: '/Login'
}))


webRouter.get('/Profile', async (req, res) =>{
    res.render('profile.handlebars', {
      pageTitle: 'Perfil',
      user: req.user
    })}
    )

webRouter.get('/AuthEmail', (req,res)=>{res.render('authentication.handlebars')})
