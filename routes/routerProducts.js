import { Router } from "express";
import  prodManager from "../src/productManager.js";
import Product from "../src/product.js";

const arrayProd = prodManager.getProducts()

const routerProducts = Router()

routerProducts.get('/', (req,res) => {
    let limit = req.query.limit
    const Products = arrayProd.slice(0, limit)
    //res.json({Products})
    res.render('home', {
        title:'Products',
        products: Products,
        productsNotEmpty: Products.length > 0,
    })  
})

//Real time products
routerProducts.get('/realtimeproducts', (req,res) => {
    let limit = req.query.limit
    const Products = arrayProd.slice(0, limit)
    res.render('realtimeproducts', {
        title:'Products real time',
    })  
})

routerProducts.get('/:pid', async (req,res)=>{
    const productFound = await prodManager.getProductById(parseInt(req.params.pid))
    res.json({productFound})  
}) 

routerProducts.post('/', (req,res)=>{
    try{
        const productData = req.body
        const newProd = new Product(productData)
        const prodAdded = prodManager.addProduct(newProd)
        res.status(201).json({prodAdded})
    }catch(error){res.status(400).json({err:error.message})}
})

routerProducts.put('/:pid', (req,res)=>{
    try{
        const newData = req.body
        const updatedProd = prodManager.updatePrduct(parseInt(req.params.pid),newData)
        res.status(201).json(updatedProd)
    }catch(error){res.status(400).json({err:error.message})}
})

routerProducts.delete('/:pid', (req,res)=>{
    try {
        const productDelete = prodManager.deleteProduct(parseInt(req.params.pid))
        res.status(201).json(`product deleted`)
    }catch(error){res.status(400).json({err:error.message})}
}) 

export default routerProducts