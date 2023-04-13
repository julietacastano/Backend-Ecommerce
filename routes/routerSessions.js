import { Router } from "express";
import passport from "passport";
import { registerForm, userRegister, loginForm, userLogin, forgetPassForm, userForgetPass } from "../controllers/sessionController.js";

const routerSessions = Router()

//Register 
routerSessions.get('/register', registerForm)
routerSessions.post('/register', passport.authenticate('register', {failWithError:true}), userRegister)

//Login 
routerSessions.get('/login', loginForm)
routerSessions.post('/login', passport.authenticate('login', {failWithError:true}), userLogin)

//Cambiar contraseña 
routerSessions.get('/olvidePass', forgetPassForm)
routerSessions.post('/olvidePass', userForgetPass)


export default routerSessions