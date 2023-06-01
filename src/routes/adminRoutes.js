import { Router } from "express"
import { penelAdmin, crearProducto, publicarProducto } from "../controllers/adminController.js"
import { justAdmin } from "../middleware/autorizacion.js"

const adminRoutes = Router()

//Panel de administracion
adminRoutes.get('/', justAdmin, penelAdmin )

//Agregar un producto
adminRoutes.get('/crear', justAdmin, crearProducto)
adminRoutes.post('/crear', justAdmin, publicarProducto)

export default adminRoutes