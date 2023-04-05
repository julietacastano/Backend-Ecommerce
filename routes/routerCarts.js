import { Router } from "express";
import cartsManager from "../src/managers/cartsManager.js";

const routerCart = Router()

//Mostrar carrito vacio
routerCart.get('/', async(req,res)=>{
    res.render('cart',{
        titlePage:'Carrito'
    })
})

//Muestra carrito--------------------------------------------------------
routerCart.get('/:cid', async (req,res)=>{
    const cartFound = await cartsManager.getCarts(req.params.cid) 
    res.render('cart',{
        titlePage:'Carrito',
        carrito: cartFound
    })
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
        const cartDeleted = cartsManager.deleteProduct(req.params.cid,req.params.pid)
        res.status(200).json(cartDeleted)
    }catch(error){res.status(400).json({err:error.message})}
})

routerCart.put('/:cid', async(req, res) => {
    try{
        const cartPopulated = cartsManager.updateCart(req.params.cid)
        res.status(200).json(cartPopulated)
    }catch(error){res.status(400).json({err:error.message})}
})


export default routerCart