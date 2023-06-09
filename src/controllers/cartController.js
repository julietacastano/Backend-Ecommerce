import cartsManager from "../managers/cartsManager.js";
import { sessionDb, productDb } from "../managers/mongoManager.js";

//Mostrar carrito vacio---------------------------------------------------
const getEmptyCart = async(req,res)=>{
    if(!req.user.carrito){
        const newCart = await cartsManager.createCart()
        const userId = req.user._id.toString()
        await sessionDb.findByIdAndUpdate(userId,{carrito:newCart})
        
        return res.redirect(`carts/${newCart._id}`)
    }


    res.render('cart',{
        nombrePagina:'Carrito',
        usuario:req.user
    })
}

//Muestra carrito ------------------------------------------------------------------------
const getCart = async (req,res)=>{
    if(!req.user.carrito){
        const newCart = await cartsManager.createCart()
        const userId = req.user._id.toString()
        await sessionDb.findByIdAndUpdate(userId,{carrito:newCart})
        
        return res.render('cart',{
            nombrePagina:'Carrito',
            usuario:req.user
        })
    }

    const cart = await cartsManager.getCarts(req.params.cid) 
    // console.log(cart)
    const prodsCarrito = []
    let valorTotal = 0
    const productos = cart.products

    for(let i=0; i<productos?.length; i++){
        let id = productos[i]._id
        let prodEncontrado = await productDb.findById(id).lean()

        prodsCarrito.push(prodEncontrado)
        valorTotal += prodEncontrado.precio
    }


    const msg = req.flash('message')
    const err = req.flash('error')
    res.render('cart',{
        nombrePagina:'Carrito',
        usuario:req.user,
        carrito: cart,
        productos:prodsCarrito,
        totalProds:prodsCarrito.length,
        valorTotal,
        err,
        msg
    })
}

//Agrega productos al carrito -------------------------------------------------
const addProdToCart = async (req,res)=>{
    if(!req.user.carrito){
        //Crear el carrito
        const newCart = await cartsManager.createCart()
        const userId = req.user._id.toString()
        await sessionDb.findByIdAndUpdate(userId,{carrito:newCart})
        
        //Agrego el producto
        await cartsManager.addToCart(newCart._id ,req.params.pid)


        req.flash('message', 'El producto se agrego con exito')
        return res.redirect(`/products/${req.params.pid}`)
    }

    //El carrito ya esta creado / Paso a agregar producto
    const carritoUsuario = req.user.carrito
    const carrito = await cartsManager.addToCart(carritoUsuario ,req.params.pid)

    //Existia otro carrito, lo reemplazo cuando agrego un producto
    if(carrito.error){
        const newCart = await cartsManager.createCart()
        const userId = req.user._id.toString()
        await sessionDb.findByIdAndUpdate(userId,{carrito:newCart})
        
        //Agrego el producto
        await cartsManager.addToCart(newCart._id ,req.params.pid)
        req.flash('message', 'El producto se agrego con exito')
        return res.redirect(`/products/${req.params.pid}`)
    }

    // Producto repetido
    if(carrito.repetido){
        req.flash('error', `${carrito.repetido}`)
        return res.redirect(`/products/${req.params.pid}`)
    }

    //Todo ok
    req.flash('message', 'El producto se agrego con exito')
    return res.redirect(`/products/${req.params.pid}`)

}

//Emilina productos al carrito -------------------------------------------------
const deleteProdCart = async(req, res) => {
    const carritoUsuario = req.user.carrito
    if(!carritoUsuario){
        req.flash('error', 'No se encontro el carrito solicitado')
        return res.redirect('/products')
    }

    const prodDeleteCart = await cartsManager.deleteProduct(carritoUsuario, req.params.pid)

    if(prodDeleteCart.error){
        req.flash('error', `${prodDeleteCart.error}`)
        res.status(403).send('Error')
    }
    
    req.flash('message', `${prodDeleteCart.succes}`)
    res.status(200).send(`${prodDeleteCart.succes}`)
}

//Vaciar Carrito --------------------------------------------------------------
const vaciarCart = async(req,res) => {
    const carritoUsuario = req.user.carrito
    if(!carritoUsuario){
        req.flash('error', 'No se encontro el carrito solicitado')
        return res.redirect('/products')
    }

    const vaciarCarrito = await cartsManager.vaciarCarrito(carritoUsuario, req.params.pid)

    
    if(vaciarCarrito.error){
        req.flash('error', `${vaciarCarrito.error}`)
        res.status(403).send('Error')
    }
    
    req.flash('message', `${vaciarCarrito.succes}`)
    res.status(200).send(`${vaciarCarrito.succes}`)


}

//Exports --------------------------------------------------------------------
export {
    getEmptyCart,
    getCart,
    addProdToCart,
    deleteProdCart,
    vaciarCart
}