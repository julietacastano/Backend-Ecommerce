import { Router } from "express";
import { getProducts, buscador, getProdById} from "../controllers/productController.js";
import { authJwt } from "../middleware/passportConfig.js";

const routerProducts = Router()

//Muestra todos los productos con un limit 
routerProducts.get('/', getProducts)
//Buscador
routerProducts.post('/buscador', buscador)

//Mostrar productos por ID
routerProducts.get('/:pid', getProdById) 

export default routerProducts