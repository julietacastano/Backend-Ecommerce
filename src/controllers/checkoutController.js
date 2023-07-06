import { check, validationResult } from "express-validator"
import cartsManager from "../managers/cartsManager.js"
import { productDb, sessionDb } from "../managers/mongoManager.js"
import orderManager from "../managers/orderManager.js"
import { confirmarCompra } from "../helpers/email.js"


const checkoutSummary = async (req,res) => {
    const order = await orderManager.getOrders(req.params.oid)

    const productos = order.products
    const prodsOrden = []
    let valorTotal = 0

    for(let i=0; i<productos?.length; i++){
        let id = productos[i]._id
        let quan = productos[i].quantity
        let prodEncontrado = await productDb.findById(id).lean()
        let precioAcc = (prodEncontrado.precio * quan)
        
        let prod = {...prodEncontrado, quantity:quan, precioAcc:precioAcc}

        prodsOrden.push(prod)
        valorTotal += (prodEncontrado.precio * quan)

    }
    const {name, email, address, tel} = order

    const err = req.flash('error')
    const msg = req.flash('message')
    res.render('checkout',{
        nombrePagina: 'Compra realizada',
        usuario:req.user,
        productos: prodsOrden,
        totalProds:prodsOrden.length,
        name,
        email,
        address,
        tel,
        valorTotal,
        err,
        msg
    })

}
const checkout = async (req,res) => {
    await check('name').notEmpty().withMessage('El nombre no puede estar vacio').run(req)
    await check('email').isEmail().withMessage('Eso no es un email').run(req)
    await check('address').notEmpty().withMessage('La dirección de envío no puede estar vacia').run(req)
    await check('tel').notEmpty().withMessage('El telefono no puede estar vacio').run(req)

    let resultadoErrores = validationResult(req)
    if(!resultadoErrores.isEmpty()){
        const errores = resultadoErrores.array()
        errores.forEach(el => {
            req.flash('error', `${el.msg}`)
        })
        const carrito = req.user.carrito
        return res.redirect(`/carts/resumen/${carrito._id}`)
    }
    

    const cart = await cartsManager.getCarts(req.params.cid)
    const {name, email, address, tel } = req.body
    const newOrder = await orderManager.createOrder(cart, name, email, address, tel)

    //Registro orden en el usuario
    const userId = req.user._id.toString()
    await sessionDb.findByIdAndUpdate(userId,{ordenes:newOrder})

    const prodsOrder = newOrder.products
    for(let i=0; i< prodsOrder.length; i++){
        let id = prodsOrder[i]._id
        let quantity = prodsOrder[i].quantity
        let prod = await productDb.findById(id).lean()

        let newStock = parseInt(prod.stock) - parseInt(quantity)

        await productDb.findByIdAndUpdate(id, {stock:newStock})
    }

    //Vacio el carrito utilizado
    const vaciarCarrito = await cartsManager.vaciarCarrito(cart)
    if(vaciarCarrito.error){
        req.flash('error', `${vaciarCarrito.error}`)
        return res.redirect('/products')
    }

    //Se envia el mail de confirmacion
    const urlCheckout = `${req.headers.host}/checkout${newOrder._id}`
    confirmarCompra({
        email,
        name,
        urlCheckout
    })

    return res.redirect(`/checkout/${newOrder._id}`)

}

export {
    checkoutSummary,
    checkout
}