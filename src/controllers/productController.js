import prodManager from "../managers/productManager.js";
import { productDb } from "../managers/mongoManager.js";

//Muestra todos los productos con un limit -------------------------------------
const getProducts = async(req,res) => {
    const {pagina} = req.query
    const redex = /^[0-9]$/
    if(!redex.test(pagina)){
        return res.redirect('/products?pagina=1')
    }

    const limit = 2
    const offset = ((pagina * limit) - limit)

    const products = await prodManager.getProducts(pagina, limit, offset)

    
    const error = req.flash('error')
    const message = req.flash('message')
    res.render('home', {
        titlePage:'Productos',
        products: products,
        usuario:req.user,
        error,
        message,
        pagina
    })  
}
//Buscador ------------------------------------------------------------
const buscador = async (req,res) =>{
    const search = req.body.q
    const products = await prodManager.buscador(search)
    
    res.render('home', {
        titlePage:'Productos',
        products,
        usuario:req.user,
        buscador:true,
    })  
}

//Mostrar productos por ID--------------------------------------------------------
const getProdById = async (req,res)=>{
    const product = await prodManager.getProductById(req.params.pid)
    
    if(product.error){
        req.flash('error', `${product.error}`)
        return res.redirect('/products?pagina=1')
    }

    res.render('detalle',{
        titlePage:'Producto seleccionado',
        producto:product,
    })

}

//Agregar un producto nuevo ------------------------------------------
const addProduct = async(req,res)=>{
    const addProd = await prodManager.addProduct(req.body)
    console.log(addProd)

    if(addProd.error){
        return res.status(404).json(addProd)
    }
    return res.status(201).json(addProd)
    
}

//Editar un producto existente ----------------------------------------------------------------
const updateProd = async (req,res)=>{
    try{
        const updatedProd = await prodManager.updatePrduct(req.params.pid, req.body)
        res.status(201).json(updatedProd.succes)
    }catch(error){res.status(400).json(updatedProd.error)}
}

//Elimiar un producto------------------------------------------------------------------------
const deleteProd =  async (req,res)=>{
    try {
        const prodDeleted = await prodManager.deleteProduct(req.params.pid)
        res.status(201).json(prodDeleted.succes)
    }catch(error){res.status(400).json(prodDeleted.error)}
}

export {
    getProducts,
    buscador,
    getProdById,
    addProduct,
    updateProd,
    deleteProd
}