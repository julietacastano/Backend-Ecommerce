import passport from "passport";
import dotenv from "dotenv"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GithubStrategy } from "passport-github2";
// import {hashpass, checkpass} from "../helpers/utils.js"
// import { sessionDb } from "../managers/mongoManager.js";
import { userRegister, userLogin } from "../../controllers/sessionController";
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

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => {next(null, user)})

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()