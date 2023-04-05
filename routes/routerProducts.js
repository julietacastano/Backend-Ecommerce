import { Router } from "express";
import  prodManager from "../src/managers/productManager.js";

const routerProducts = Router()

//Muestra todos los productos con un limit -------------------------------------
routerProducts.get('/', async(req,res) => {
    let limit = req.query.limit
    let price = req.query.price
    let name = req.query.name

    const Products = await prodManager.getProducts(limit, price, name)
    //console.log(Products)

    res.render('home', {
        titlePage:'Productos',
        products: Products,
    })  
})

//Agregar un producto nuevo ------------------------------------------
routerProducts.post('/', async(req,res)=>{

    const addProd = await prodManager.addProduct(req.body)
    console.log(addProd)

    if(addProd.error){
        return res.status(404).json(addProd)
    }
    return res.status(201).json(addProd)
    
})

//Real time productos
routerProducts.get('/realtimeproducts', (req,res) => {
    let limit = req.query.limit
    const Products = arrayProd.slice(0, limit)
    res.render('realtimeproducts', {
        title:'Products real time',
    })  
})

//Mostrar productos por ID--------------------------------------------------------
routerProducts.get('/:pid', async (req,res)=>{
    const productFound = await prodManager.getProductById(req.params.pid)
    const prod = productFound.findId
    if(productFound.error){
        res.render('templates/message', {
            titlePage: 'Productos',
            mensaje: productFound.error
        })
    }
    res.render('detalle',{
        titlePage:'Producto seleccionado',
        producto:prod
    })

}) 


//Editar un producto existente ----------------------------------------------------------------
routerProducts.put('/:pid', async (req,res)=>{
    try{
        const updatedProd = await prodManager.updatePrduct(req.params.pid, req.body)
        res.status(201).json(updatedProd.succes)
    }catch(error){res.status(400).json(updatedProd.error)}
})

//Elimiar un producto------------------------------------------------------------------------
routerProducts.delete('/:pid', async (req,res)=>{
    try {
        const prodDeleted = await prodManager.deleteProduct(req.params.pid)
        res.status(201).json(prodDeleted.succes)
    }catch(error){res.status(400).json(prodDeleted.error)}
}) 

export default routerProducts