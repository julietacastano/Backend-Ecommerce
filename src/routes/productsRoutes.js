import { Router } from "express";
import { getProducts, buscador, filtro, getCat, getProdById} from "../controllers/productController.js";

const routerProducts = Router()

//Muestra todos los productos con un limit 
routerProducts.get('/', getProducts)
//Buscador
routerProducts.post('/buscador', buscador)
//Filtros
routerProducts.get('/filter/:cat', filtro)
routerProducts.get('/categorias/:cat', getCat)

//Mostrar productos por ID
routerProducts.get('/:pid', getProdById) 

export default routerProducts