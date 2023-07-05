import cartsManager from "../managers/cartsManager.js"
import { productDb, sessionDb } from "../managers/mongoManager.js"
import orderManager from "../managers/orderManager.js"


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
    })

}
const checkout = async (req,res) => {
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

    const vaciarCarrito = await cartsManager.vaciarCarrito(cart)
    if(vaciarCarrito.error){
        req.flash('error', `${vaciarCarrito.error}`)
        return res.redirect('/products')
    }

    return res.redirect(`/checkout/${newOrder._id}`)

}

export {
    checkoutSummary,
    checkout
}