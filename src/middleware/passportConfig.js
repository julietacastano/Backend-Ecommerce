import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
// import {hashpass, checkpass} from "../helpers/utils.js"
// import { sessionDb } from "../managers/mongoManager.js";
import sessManager from "../managers/sessionManager.js";

passport.use('register', new LocalStrategy(
    {passReqToCallback:true}, 
    async (req, username, password, done) =>{
        try {
            const {name, email, pass, edad} = req.body
            if(!name){done ({error:"El nombre es obligatorio"})}
            if(!email){done ({error:"El email es obligatorio"})}
            if(!pass){done ({error:"La contraseña es obligatoria"})}
            
            const addSec = await sessManager.addSession(req.body)
            console.log(addSec)
            
            // const findUser = await sessionDb.findOne({email})
    
            // if(findUser){
                // return done ({error:"Email registrado, por favor avanzar a log in"})
            // }
    
            // const passHash = hashpass(pass) 
            
            // const newSession = await sessionDb.create({
                // name:name,
                // email: email,
                // edad: edad,
                // pass: passHash,
            // })
    
            return done(null, addSec)

        } catch (error) {
            done(error)
        }
    }
))

passport.use('login', new LocalStrategy(
    {passReqToCallback:true}, 
    async (req, username, password, done) =>{
        try {
            const {email, pass} = req.body
            if(!email){done ({error:"El email es obligatorio"})}
            if(!pass){done ({error:"La contraseña es obligatoria"})}

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

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => {next(null, user)})

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()