import passport from "passport";
import jwt, { ExtractJwt } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GithubStrategy } from "passport-github2";
import { sessionDb } from "../managers/mongoManager.js";
import cookieExtractor from "../helpers/cookieExtractor.js";

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, 
    async (email, password, done) =>{
        const usuario = await sessionDb.findOne({email})
        if(!usuario){
            return done(null, false, {message: 'Error de autenticación'})
        }

        const verificarPassword = usuario.comparePassword(password)
        if(!verificarPassword){
            return done(null, false, {message: 'Error de autenticación'})
        }

        return done(null, usuario)
    }
))

passport.use('github', new GithubStrategy(
    {clientID: process.env.GITHUB_CLIENTID, clientSecret: process.env.GITHUB_CLIENTSECRET, callbackURL:process.env.GITHUB_CALLBACKURL },
    async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            let user
            try {
                await userLogin(profile)
            } catch (error) {
                user = await userRegister(profile)
            }
            done(null, user)
    }
))

passport.use('jwt', new jwt.Strategy({
    jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:process.env.SECRETCOOKIE_JWT,
    }, async(jwt_payload, done) =>{
        try {
            return done(null, jwt_payload) //payload es el contenido del token ya descifrado
        } catch (error) {
            return done(error)
        }
    }
))
const authJwt = (req, res, next) => {
    passport.authenticate('jwt', (error, user, info) => {
        if (error || !user){return next({error:'error de autenticacion'})} 
        req.user = user
        next()
    })(req, res, next)
}

passport.serializeUser((usuario, done) => done(null, usuario._id))
passport.deserializeUser(async(id, done) => {
    const usuario = await sessionDb.findById(id)
    return done(null, usuario)
})

const passportInitialize = passport.initialize()
const sessionInitialize = passport.session()

const authUser = passport.authenticate('login',{
    successRedirect: '/products/',
    failureRedirect: '/auth/login',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

const authGithub = passport.authenticate('github', { session: false, scope: ['user:email'] })
const authGithubCallback = passport.authenticate('github', { session: false, failWithError: true })

export{
    passportInitialize,
    sessionInitialize,
    authGithub,
    authGithubCallback,
    authUser,
    authJwt
}
