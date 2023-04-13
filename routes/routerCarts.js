import { Router } from "express";
import { getEmptyCart, createCart, getCart, updateCart, addProdToCart, deleteProdFromCart } from "../controllers/cartController.js";

const routerCart = Router()

//Mostrar carrito vacio
routerCart.get('/', getEmptyCart)
//Crea un carrito 
routerCart.post('/', createCart)

//Muestra carrito
routerCart.get('/:cid', getCart)
//Actualiza carrito
routerCart.put('/:cid', updateCart)

//Agrega productos al carrito 
routerCart.post('/:cid/product/:pid', addProdToCart)
//Eliminar producto del carrito
routerCart.delete(':cid/products/:pid', deleteProdFromCart)




export default routerCart