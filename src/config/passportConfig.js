import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import {hashpass, checkpass} from "../helpers/utils.js"
import { sessionDb } from "../managers/mongoManager.js";

passport.use('register', new LocalStrategy({ usernameField:'email' }, async (req, username, password, done) =>{
    const {name, email, pass, age} = req.body
    if(!name){res.render('register', {titlePage: 'Registro', error: 'El nombre es obligatorio'})}
    if(!email){res.render('register', {titlePage: 'Registro', error: 'El email es obligatorio'})}
    if(!pass){res.render('register', {titlePage: 'Registro', error: 'La contraseña es obligatoria'})}

    const findEmail = await sessionDb.findOne({email})

    if(findEmail){
        return done ({error:"Email registrado, por favor avanzar a log in"})
    }

    const passHash = hashpass(pass) 

    const newSession = await sessionDb.create({
        username:username,
        email: email,
        edad: edad,
        password: passHash,
    })

    return done ({succes:`Felicitaciones ${newSession.username}, tu cuenta se ha creado correctamente`})
}))

passport.use('login', new LocalStrategy({ usernameField:'email' }, async (req, username, password, done) =>{
    const {email, pass} = req.body
    if(!email){res.render('login', {titlePage: 'Login', error: 'El email es obligatorio'})}
    if(!pass){res.render('login', {titlePage: 'Login', error: 'La contraseña es obligatoria'})}

    const findUser = await this.model.findOne({email})

    if(!findUser){
        return done ({error:'Error de autenticacion'})
    }

    const passCheck = checkpass(pass, findUser.pass)
    if(!passCheck){
        return done ({error:'Error de autenticacion'})
    }

    return done ({succes:'Usuario verificado'})
}))
