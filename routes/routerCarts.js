import { Router } from "express";
import cartsManager from "../src/managers/cartsManager.js";

const routerCart = Router()

//Muestra carrito--------------------------------------------------------
routerCart.get('/:cid', async (req,res)=>{
    await cartsManager.getCarts(req.params.cid) 
    res.status(201).json({succes:"Se encontro el carrito pedido"})
})

//Crea un carrito -------------------------------------------------
routerCart.post('/',async (req,res)=>{
    try{
        const newCart = await cartsManager.createCart()
        res.status(200).json(newCart.succes)
    }catch(error){res.status(400).json({err:error.message})}
})

//Agrega productos al carrito -------------------------------------------------
routerCart.post('/:cid/product/:pid',async (req,res)=>{
    try{
        const addProd = await cartsManager.addToCart(req.params.cid,req.params.pid)
        res.status(200).json(addProd)
    }catch(error){res.status(400).json({err:error.message})}
})

routerCart.delete(':cid/products/:pid', async(req, res) => {
    try{
        const cartDeleted = prodManager.deleteProduct(req.params.cid,req.params.pid)
        res.status(200).json(cartDeleted)
    }catch(error){res.status(400).json({err:error.message})}
})

routerCart.put('/:cid', async(req, res) => {
    try{
        const cartPopulated = prodManager.updateCart(req.params.cid)
        res.status(200).json(cartPopulated)
    }catch(error){res.status(400).json({err:error.message})}
})


export default routerCart