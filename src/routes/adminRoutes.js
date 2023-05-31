import { Router } from "express"
import { penelAdmin } from "../controllers/adminController.js"
import { justAdmin } from "../middleware/autorizacion.js"

const adminRoutes = Router()

adminRoutes.get('/', justAdmin, penelAdmin )

export default adminRoutes