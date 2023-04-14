import sessManager from "../src/managers/sessionManager.js";
import jwtGenerator from "../src/helpers/token.js";

//Register ---------------------------------------
const registerForm =  (req,res)=>{
    res.render('register', {
        titlePage:'Registro',
    })  
}
const userRegister = async (req,res)=>{
    if(!req.body.name){res.render('register', {titlePage: 'Registro', error: 'El nombre es obligatorio'})}
    if(!req.body.email){res.render('register', {titlePage: 'Registro', error: 'El email es obligatorio'})}
    if(!req.body.pass){res.render('register', {titlePage: 'Registro', error: 'La contraseña es obligatoria'})}
    
    const addSec = await sessManager.addSession(req.body)

    if(addSec.error){
        {res.render('register', {titlePage: 'Registro', error: addSec.error})}
    }

    if(addSec.succes){
        res.render('templates/message', {
        titlePage: 'usuario registrado',
        mensaje:addSec.succes
        })
        const token = jwtGenerator({id:req.body._id , name: req.body.name})
        return res.cookie('tokenJWT', token, {
                httpOnly: true,
                maxAge: 60*60*1000,
            })
    }
}

//Login ----------------------------------------
const loginForm = (req,res)=>{
    res.render('login', {
        titlePage:'Login',
    })  
}
const userLogin =  async (req,res)=>{
    // if(!req.body.email){res.render('login', {titlePage: 'Login', error: 'El email es obligatorio'})}
    // if(!req.body.pass){res.render('login', {titlePage: 'Login', error: 'La contraseña es obligatoria'})}
// 
    // 
    // const userLog = await sessManager.logIn(req.body)
    const user = req.user
    console.log(user)

    if(user.error){
        {res.render('login', {titlePage: 'Login', error: userLog.error})}
    }

    if(user.succes){
        // res.send(userLog.succes)
        const token = jwtGenerator({id:req.body._id , name: req.body.name})
        return res.cookie('tokenJWT', token, {
                httpOnly: true,
                maxAge: 60*60*1000,
            }).redirect('/api/products')
    }
    // if(userLog.succes){
    // const token = jwtGenerator({id:userLog._id, name: userLog.name})
    //     return res.cookie('_token', token, {
    //     httpOnly: true,
    // }).redirect('/api/products')
    // }
}

//Cambiar contraseña ----------------------------------------
const forgetPassForm = (req,res)=>{
    res.render('olvidePass', {
        titlePage:'Recuperar contraseña',
    })  
}
const userForgetPass = async (req,res)=>{
    if(!req.body.email){res.render('login', {titlePage: 'Login', error: 'El email es obligatorio'})}
    if(!req.body.pass){res.render('login', {titlePage: 'Login', error: 'La contraseña es obligatoria'})}

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
}

const userLogout = (req, res, next) =>{
    req.logout(err => {
        res.sendStatus(200)
    })
    res.clearCookies('tokenJWT',{   
        httpOnly:true
    }).redirect('/api/sessions/login')
}


export {
    registerForm,
    userRegister,
    loginForm,
    userLogin,
    forgetPassForm,
    userForgetPass,
    userLogout
}