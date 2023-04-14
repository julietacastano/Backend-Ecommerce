import { Router } from "express";
import passport from "passport";
import { registerForm, userRegister, loginForm, userLogin, forgetPassForm, userForgetPass, userLogout } from "../controllers/sessionController.js";

const routerSessions = Router()

//Register 
routerSessions.get('/register', registerForm)
routerSessions.post('/register', userRegister)

//Login 
routerSessions.get('/login', loginForm)
routerSessions.post('/login', passport.authenticate('login', {failWithError:true}), userLogin)

//Login with github
routerSessions.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
routerSessions.get('/githubcallback', passport.authenticate('github', { failWithError: true }), (req,res,next) =>{res.redirect('/')} )

//Cambiar contraseña 
routerSessions.get('/olvidePass', forgetPassForm)
routerSessions.post('/olvidePass', userForgetPass)

//Logout
routerSessions.post('/logout', userLogout)


export default routerSessions