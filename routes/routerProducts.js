import { Router } from "express";
//import { justLogged } from "../src/middleware/justLogged.js";
import { authJwt } from "../src/middleware/passportConfig.js";
import { getProd, addProduct, getProdById, updateProd, deleteProd } from "../controllers/productController.js";

const routerProducts = Router()

//Muestra todos los productos con un limit 
routerProducts.get('/', authJwt, getProd)
//Agregar un producto nuevo 
routerProducts.post('/', addProduct)

//Mostrar productos por ID
routerProducts.get('/:pid', authJwt, getProdById) 
//Editar un producto existente
routerProducts.put('/:pid', updateProd)
//Elimiar un producto
routerProducts.delete('/:pid', deleteProd) 

export default routerProducts