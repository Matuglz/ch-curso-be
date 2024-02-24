import passport from 'passport'
import { Strategy as localStrategy } from 'passport-local'
import { Strategy as githubStrategy } from 'passport-github2'
import { Strategy as googleStrategy } from 'passport-google-oauth20'
import { config as configDotenv } from "dotenv";
import { usersService } from '../service/users.service.js';
configDotenv()


passport.use('loginLocal', new localStrategy({
    usernameField: 'email'
}, async function verificationCallback(username, password, done) {
    try {
        const userData = await usersService.login(username, password)
        done(null, userData)
    }
    catch (error) {
        done(error)
    }
}))

passport.use('loginGithub', new githubStrategy({
    clientID: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_APP_CALLBACK_URL
}, async (_, __, profile, done) => {
    try {
        let body = {
            name: profile.username,
            lastName: profile.lastName || 'undefined',
            age: profile.age || 0,
            email: profile.username,
            provider: profile.provider

        }
        const user = await usersService.register(body)
        done(null, profile)
    }
    catch (error) {
        return done(error)
    }
}))

passport.use('loginGoogle', new googleStrategy({
    clientID: process.env.GOOGLE_AUTH_APP_CLIENT_ID,
    clientSecret: process.env.GOGLE_AUTH_APP_SECRET_ID,
    callbackURL: process.env.GOOGLE_AUTH_APP_CALLBACK_URL
}, async (_, __, profile, done) => {
    try {
        let body = {
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            provider: profile.provider
        }
        const user = await usersService.register(body)
        done(null, profile)
    }
    catch (error) {
        return done(error)
    }
}))


passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()