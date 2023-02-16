import { Router } from "express";
import cartsManager from "../src/cartsManager.js";

const routerCart = Router()

routerCart.get('/:cid', (req,res)=>{
    const cartFound = cartsManager.getCart(parseInt(req.params.cid))
    res.status(201).json({...cartFound})
})

routerCart.post('/',(req,res)=>{
    try{
        const newCart = cartsManager.createCart()
        res.status(200).json(newCart)
    }catch(error){res.status(400).json({err:error.message})}
})

routerCart.post('/:cid/product/:pid',(req,res)=>{
    try{
        const addProd = cartsManager.addToCart(parseInt(req.params.cid),parseInt(req.params.pid))
        res.status(200).json(addProd)
    }catch(error){res.status(400).json({err:error.message})}
})


export default routerCart