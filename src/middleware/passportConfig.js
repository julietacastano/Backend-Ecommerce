import passport from "passport";
import dotenv from "dotenv"
import jwt, { ExtractJwt } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GithubStrategy } from "passport-github2";
// import {hashpass, checkpass} from "../helpers/utils.js"
// import { sessionDb } from "../managers/mongoManager.js";
import { userRegister, userLogin } from "../../controllers/sessionController.js";
import cookieExtractor from "../helpers/cookieExtractor.js";
dotenv.config()

passport.use('login', new LocalStrategy(
    {usernameField:'email'}, 
    async (username, password, done) =>{
        try {
            if(!username){done ({error:"El email es obligatorio"})}
            if(!password){done ({error:"La contraseña es obligatoria"})}

            const userLog = await sessManager.logIn(req.body)

            // const findUser = await this.model.findOne({email})

            // if(!findUser){
                // return done ({error:'Error de autenticacion'})
            // }
// 
            // const passCheck = checkpass(pass, findUser.pass)
            // if(!passCheck){
                // return done ({error:'Error de autenticacion'})
            // }

            return done (null, userLog)

        } catch (error) {
            done(error)
        }
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


const passportInitialize = passport.initialize()

const authLocal = passport.authenticate('login', { session: false, failWithError:true})
const authGithub = passport.authenticate('github', { session: false, scope: ['user:email'] })
const authGithubCallback = passport.authenticate('github', { session: false, failWithError: true })

export{
    passportInitialize,
    authLocal,
    authGithub,
    authGithubCallback,
    authJwt
}
