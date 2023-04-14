import { Router } from "express"
import { authJwt } from "../src/middleware/passportConfig.js"
import { adminForm } from "../controllers/adminController.js"
import { justAdmin } from "../src/middleware/autorizacion.js"

const routerAdmin = Router()

routerAdmin.get('/', authJwt, justAdmin, adminForm )

export default routerAdmin