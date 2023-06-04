import prodManager from "../managers/productManager.js";

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

    
    const err = req.flash('error')
    const msg = req.flash('message')
    res.render('home', {
        nombrePagina:'Productos',
        products: products,
        usuario:req.user,
        err,
        msg,
        pagina
    })  
}
//Buscador ------------------------------------------------------------
const buscador = async (req,res) =>{
    const search = req.body.q
    const products = await prodManager.buscador(search)
    
    res.render('home', {
        nombrePagina:'Productos',
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
        nombrePagina:'Producto seleccionado',
        producto:product,
    })

}

export {
    getProducts,
    buscador,
    getProdById
}