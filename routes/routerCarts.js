import { Router } from "express";
import { justLogged } from "../src/middleware/justLogged.js";
import { getEmptyCart, createCart, getCart, updateCart, addProdToCart, deleteProdFromCart } from "../controllers/cartController.js";

const routerCart = Router()

//Mostrar carrito vacio
routerCart.get('/', justLogged, getEmptyCart)
//Crea un carrito 
routerCart.post('/', createCart)

//Muestra carrito
routerCart.get('/:cid', justLogged, getCart)
//Actualiza carrito
routerCart.put('/:cid', updateCart)

//Agrega productos al carrito 
routerCart.post('/:cid/product/:pid', addProdToCart)
//Eliminar producto del carrito
routerCart.delete(':cid/products/:pid', deleteProdFromCart)




export default routerCart