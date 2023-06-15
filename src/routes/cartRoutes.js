import { Router } from "express";
import { justLogged } from "../middleware/justLogged.js";
import { getEmptyCart, getCart, addProdToCart, deleteProdCart, vaciarCart, sumarQuantity, restarQuantity, getSummary } from "../controllers/cartController.js";

const cartRoutes = Router()

//Mostrar carrito vacio
cartRoutes.get('/', justLogged, getEmptyCart)


//Muestra carrito
cartRoutes.get('/:cid', justLogged, getCart)

//Agrega productos al carrito 
cartRoutes.post('/agregarProd/:pid', justLogged, addProdToCart)

//Eliminar producto del carrito
cartRoutes.delete('/eliminar/:pid', deleteProdCart)
//Vaciar carrito
cartRoutes.delete('/vaciarCarrito', vaciarCart)

//Manejar cantidades
cartRoutes.put('/sumar/:pid', sumarQuantity)
cartRoutes.put('/restar/:pid', restarQuantity)

//Resumen
cartRoutes.get('/resumen/:cid',justLogged, getSummary)


export default cartRoutes