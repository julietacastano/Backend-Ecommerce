import { Router } from "express";
import { authLocal, authGithub, authGithubCallback } from "../src/middleware/passportConfig.js";
import { registerForm, userRegister, loginForm, userLogin, forgetPassForm, userForgetPass, userLogout } from "../controllers/sessionController.js";

const routerSessions = Router()

//Register 
routerSessions.get('/register', registerForm)
routerSessions.post('/register', userRegister)

//Login 
routerSessions.get('/login', loginForm)
routerSessions.post('/login', authLocal , userLogin)

//Login with github
routerSessions.get('/github', authGithub)
routerSessions.get('/githubcallback', authGithubCallback , (req,res,next) =>{res.redirect('/')} )

//Cambiar contraseña 
routerSessions.get('/olvidePass', forgetPassForm)
routerSessions.post('/olvidePass', userForgetPass)

//Logout
routerSessions.post('/logout', userLogout)


export default routerSessions