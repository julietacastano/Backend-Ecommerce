import { Router } from "express";
import sessManager from "../src/managers/sessionManager.js";

const routerSessions = Router()

//Register ---------------------------------------
routerSessions.get('/register', (req,res)=>{
    res.render('register', {
        titlePage:'Registro',
    })  
})
routerSessions.post('/api/sessions/register', async (req,res)=>{
    //const {username, email, edad, pass}
    if(!req.body.username){res.render('register', {titlePage: 'Registro', error: 'El username es obligatorio'})}
    if(!req.body.email){res.render('register', {titlePage: 'Registro', error: 'El email es obligatorio'})}
    if(!req.body.pass){res.render('register', {titlePage: 'Registro', error: 'La password es obligatoria'})}
    
    const addSec = await sessManager.addSession(req.body)
    console.log(addSec)

    if(addSec.error){
        {res.render('register', {titlePage: 'Registro', error: addSec.error})}
    }

    if(addSec.succes){
        res.render('templates/message', {
        titlePage: 'usuario registrado',
        mensaje:addSec.succes
    })
    }
})

//Login ----------------------------------------
routerSessions.get('/login', (req,res)=>{
    res.render('login', {
        titlePage:'Login',
    })  
})
routerSessions.post('/login', async (req,res)=>{
    if(!req.body.email){res.render('login', {titlePage: 'Login', error: 'El email es obligatorio'})}
    if(!req.body.pass){res.render('login', {titlePage: 'Login', error: 'La password es obligatoria'})}

    
    const userLog = await sessManager.logIn(req.body)
    console.log(userLog)

    if(userLog.error){
        {res.render('login', {titlePage: 'Login', error: userLog.error})}
    }

    if(userLog.succes){
        return res.redirect('/api/products')
    }

    //Cambiar password ------------------------------------------------------
    routerSessions.get('/olvidePass', (req,res)=>{
        res.render('olvidePass', {
            titlePage:'Recuperar contraseña',
        })  
    })
    routerSessions.post('/api/sessions/olvidePass', async (req,res)=>{
        if(!req.body.email){res.render('login', {titlePage: 'Login', error: 'El email es obligatorio'})}
        if(!req.body.pass){res.render('login', {titlePage: 'Login', error: 'La password es obligatoria'})}

        const recupass = await sessManager.updatepass(req.body)

        if(recupass.error){
            {res.render('register', {titlePage: 'Registro', error: addSec.error})}
        }
    
        if(recupass.succes){
            res.render('templates/message', {
            titlePage: 'Cambio exitoso',
            mensaje:addSec.succes
        })
        }
    })
})

export default routerSessions