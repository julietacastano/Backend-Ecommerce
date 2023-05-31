import { Router } from "express";
import { getProducts, buscador, getProdById, addProduct, updateProd, deleteProd,} from "../controllers/productController.js";
import { authJwt } from "../middleware/passportConfig.js";

const routerProducts = Router()

//Muestra todos los productos con un limit 
routerProducts.get('/', getProducts)
//Buscador
routerProducts.post('/buscador', buscador)

//Mostrar productos por ID
routerProducts.get('/:pid', getProdById) 

//Agregar un producto nuevo 
routerProducts.post('/', addProduct)

//Editar un producto existente
routerProducts.put('/:pid', updateProd)

//Elimiar un producto
routerProducts.delete('/:pid', deleteProd) 




export default routerProducts