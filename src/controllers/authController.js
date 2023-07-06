import { check, validationResult } from "express-validator";
import sessManager from "../managers/sessionManager.js";
import { reestablecerPassMail } from "../helpers/email.js";

//Register ---------------------------------------
const registerForm =  (req,res)=>{
    const err = req.flash('error')
    const msg = req.flash('message')

    res.render('register', {
        nombrePagina:'Registro',
        err,
        msg
    })  
}
const userRegister = async (req,res)=>{
    await check('name').notEmpty().withMessage('El nombre no puede estar vacio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un email').run(req)
    await check('password').isLength({min:4}).withMessage('La contraseña es muy corta').run(req)
    
    let resultadoErrores = validationResult(req)
    if(!resultadoErrores.isEmpty()){
        return res.render('register', {
            nombrePagina:'Registro',
            errores:resultadoErrores.array()
        })  
    }

    const addSec = await sessManager.addSession(req.body)

    if(addSec.error){
        req.flash('error', `${addSec.error}`)
        return res.redirect('/auth/register')
    }

    req.flash('message', `${addSec.succes}`)
    return res.redirect('/auth/login')
}

//Login ----------------------------------------
const loginForm = (req,res)=>{
    const err = req.flash('error')
    const msg = req.flash('message')

    res.render('login', {
        nombrePagina:'Iniciar sesion',
        err,
        msg
    })  
}

//Cambiar contraseña -------------------------------------------------------------------------------
const olvidePassForm = (req,res)=>{
    const err = req.flash('error')
    const msg = req.flash('message')

    res.render('olvidePass', {
        nombrePagina:'Recuperar contraseña',
        err,
        msg
    })  
}
//Generar y enviar token
const enviarToken = async (req,res) => {
    await check('email').notEmpty().withMessage('El email no puede estar vacio').run(req)

    let resultadoErrores = validationResult(req)
    if(!resultadoErrores.isEmpty()){
        return res.render('olvidePass', {
            nombrePagina:'Recuperar contraseña',
            errores:resultadoErrores.array()
        })  
    }

    const usuario = await sessManager.getToken(req.body)

    if(usuario.error){
        req.flash('error', `${usuario.error}`)
        return res.redirect('/auth/olvidePass')
    }

    const urlReset = `${req.headers.host}/auth/olvidePass/${usuario.token}`

    reestablecerPassMail({
        email:usuario.email,
        nombre:usuario.name,
        urlReset,
    })


    req.flash('message', 'Te enviamos un mail para recuperar tu contraseña')
    return res.redirect('/auth/olvidePass')

}

const cambiarPass = async (req,res) => {
    const token = req.params.token
    const usuario = await sessManager.validateToken(token)
    if(usuario.error){
        req.flash('error', `${usuario.error}`)
        return res.redirect('/auth/olvidePass')

    }

    const err = req.flash('error')

    res.render('cambiarPass', {
        nombrePagina:'Recuperar contraseña',
        err,
    })  
}
//Guardo la nueva password
const guardarNuevaPass = async (req,res) => {
    const token = req.params.token
    const password = req.body.password

    await check('password').isLength({min:4}).withMessage('La contraseña es muy corta').run(req)
    
    let resultadoErrores = validationResult(req)
    if(!resultadoErrores.isEmpty()){
        return res.render('cambiarPass', {
            nombrePagina:'Recuperar contraseña',
            errores:resultadoErrores.array()
        })  
    }

    const recuperarPass = await sessManager.updatepass(password, token)

    if(recuperarPass.error){
        req.flash('error', `${recuperarPass.error}`)
        return res.redirect('/auth/olvidePass')
    }

    req.flash('message', `${recuperarPass.succes}`)
    return res.redirect('/auth/login')
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
    enviarToken,
    cambiarPass,
    guardarNuevaPass,
    userLogout
}