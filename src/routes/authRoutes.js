import { Router } from "express";
import {authGithub, authGithubCallback, authUser } from "../middleware/passportConfig.js";
import { registerForm, userRegister, loginForm, olvidePassForm, olvidePass, userLogout } from "../controllers/authController.js";

const authRoutes = Router()

//Register 
authRoutes.get('/register', registerForm)
authRoutes.post('/register', userRegister)

//Login 
authRoutes.get('/login', loginForm)
authRoutes.post('/login', authUser)

//Login with github
authRoutes.get('/github', authGithub)
authRoutes.get('/githubcallback', authGithubCallback , (req,res,next) =>{res.redirect('/')} )

//Cambiar contraseña 
authRoutes.get('/olvidePass', olvidePassForm)
authRoutes.post('/olvidePass', olvidePass)

//Logout
authRoutes.get('/logout', userLogout)


export default authRoutes