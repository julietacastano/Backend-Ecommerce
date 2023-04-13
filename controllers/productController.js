import prodManager from "../src/managers/productManager.js";

//Muestra todos los productos con un limit -------------------------------------
const getProd = async(req,res) => {
    let limit = req.query.limit
    let price = req.query.price
    let name = req.query.name

    const Products = await prodManager.getProducts(limit, price, name)
    //console.log(Products)
    if(error){
        res.render('templates/message', {
            titlePage: 'Productos',
            mensaje: 'error de autorizacion'
        })
    }

    res.render('home', {
        titlePage:'Productos',
        products: Products,
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

//Mostrar productos por ID--------------------------------------------------------
const getProdById = async (req,res)=>{
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
    getProd,
    addProduct,
    getProdById,
    updateProd,
    deleteProd
}