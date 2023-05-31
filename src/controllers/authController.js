import { check, validationResult } from "express-validator";
import sessManager from "../managers/sessionManager.js";
import jwtGenerator from "../helpers/token.js";

//Register ---------------------------------------
const registerForm =  (req,res)=>{
    const err = req.flash('error')
    const msg = req.flash('message')

    res.render('register', {
        titlePage:'Registro',
        err,
        msg
    })  
}
const userRegister = async (req,res)=>{
    await check('name').notEmpty().withMessage('El nombre no puede estar vacio').run(req)
    await check('email').notEmpty().withMessage('El email no puede estar vacio').run(req)
    await check('password').isLength({min:4}).withMessage('La contraseña es muy corta').run(req)
    
    let resultadoErrores = validationResult(req)
    if(!resultadoErrores.isEmpty()){
        return res.render('register', {
            titlePage:'Registro',
            errores:resultadoErrores.array()
        })  
    }

    const addSec = await sessManager.addSession(req.body)

    if(addSec.error){
        req.flash('error', `${addSec.error}`)
        return res.redirect('/auth/register')
    }

    if(addSec.succes){
        const token = jwtGenerator({id:req.body._id , name: req.body.name})
        res.cookie('tokenJWT', token, {
                httpOnly: true,
                maxAge: 60*60*1000,
            })

        req.flash('message', `${addSec.succes}`)
        return res.redirect('/auth/login')
    }
}

//Login ----------------------------------------
const loginForm = (req,res)=>{
    const err = req.flash('error')
    const msg = req.flash('message')

    res.render('login', {
        titlePage:'Login',
        err,
        msg
    })  
}

//Cambiar contraseña ----------------------------------------
const olvidePassForm = (req,res)=>{
    const err = req.flash('error')
    const msg = req.flash('message')

    res.render('olvidePass', {
        titlePage:'Recuperar contraseña',
        err,
        msg
    })  
}
const olvidePass = async (req,res)=>{
    await check('email').notEmpty().withMessage('El email no puede estar vacio').run(req)
    await check('password').isLength({min:4}).withMessage('La contraseña es muy corta').run(req)

    let resultadoErrores = validationResult(req)
    if(!resultadoErrores.isEmpty()){
        return res.render('olvidePass', {
            titlePage:'Recuperar contraseña',
            errores:resultadoErrores.array()
        })  
    }

    const recuperarPass = await sessManager.updatepass(req.body)

    if(recuperarPass.error){
        req.flash('error', `${recuperarPass.error}`)
        return res.redirect('/auth/olvidePass')
    }

    if(recuperarPass.succes){
        req.flash('message', `${recuperarPass.succes}`)
        return res.redirect('/auth/login')
    }
}

//Log out----------------------------------------------------------
const userLogout = (req, res, next) =>{   
    req.logout(function(err) {
        if (err) { return next(err); }
    res.redirect('/products');
    })
}



export {
    registerForm,
    userRegister,
    loginForm,
    olvidePassForm,
    olvidePass,
    userLogout
}