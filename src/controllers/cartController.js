import cartsManager from "../managers/cartsManager.js";

//Mostrar carrito vacio
const getEmptyCart = async(req,res)=>{
    res.render('cart',{
        nombrePagina:'Carrito',
        usuario:req.user
    })
}
//Crea un carrito -------------------------------------------------
const createCart = async (req,res)=>{
    try{
        const newCart = await cartsManager.createCart()
        res.status(200).json(newCart.succes)
    }catch(error){res.status(400).json({err:error.message})}
}

//Muestra carrito -------------------------------------------------
const getCart = async (req,res)=>{
    const cartFound = await cartsManager.getCarts(req.params.cid) 
    res.render('cart',{
        nombrePagina:'Carrito',
        carrito: cartFound
    })
}

//Actualiza carrito -------------------------------------------------
const updateCart = async(req, res) => {
    try{
        const cartPopulated = cartsManager.updateCart(req.params.cid)
        res.status(200).json(cartPopulated)
    }catch(error){res.status(400).json({err:error.message})}
}

//Agrega productos al carrito -------------------------------------------------
const addProdToCart = async (req,res)=>{
    try{
        const addProd = await cartsManager.addToCart(req.params.cid,req.params.pid)
        res.status(200).json(addProd)
    }catch(error){res.status(400).json({err:error.message})}
}

//Emilina productos al carrito -------------------------------------------------
const deleteProdFromCart = async(req, res) => {
    try{
        const cartDeleted = cartsManager.deleteProduct(req.params.cid,req.params.pid)
        res.status(200).json(cartDeleted)
    }catch(error){res.status(400).json({err:error.message})}
}

export {
    getEmptyCart,
    createCart,
    getCart,
    updateCart,
    addProdToCart,
    deleteProdFromCart
}