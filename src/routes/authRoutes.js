import { Router } from "express";
import { authUser } from "../middleware/passportConfig.js";
import { registerForm, userRegister, loginForm, olvidePassForm, enviarToken, cambiarPass, guardarNuevaPass, userLogout } from "../controllers/authController.js";

const authRoutes = Router()

//Register 
authRoutes.get('/register', registerForm)
authRoutes.post('/register', userRegister)

//Login 
authRoutes.get('/login', loginForm)
authRoutes.post('/login', authUser)

//Cambiar contraseña 
authRoutes.get('/olvidePass', olvidePassForm)
authRoutes.post('/olvidePass', enviarToken)
authRoutes.get('/olvidePass/:token', cambiarPass)
authRoutes.post('/olvidePass/:token', guardarNuevaPass)

//Logout
authRoutes.get('/logout', userLogout)


export default authRoutes