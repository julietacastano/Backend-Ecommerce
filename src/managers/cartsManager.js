import { cartDb } from './mongoManager.js';
import { productDb } from './mongoManager.js';

class Carts{
    constructor(model){
        this.model=model
    }

    //Muestra carritos-------------------------------------------
    async getCarts(cartId){
        const cart = await this.model.findById(cartId).populate('products').lean()
        if(!cart){ 
        return {error:"No se encontro el carrito pedido"}
        }
        
        return cart
    }

    //Crea carrito----------------------------------------------------------
    async createCart(){
        const newCart = await this.model.create({
            products:[],
        })
        return newCart
    }

    //Agregar producto al carrito ---------------------------------------
    async addToCart(idCart, idProd){
        //Encuentro carrito y lo valido 
        const findCartId = await this.model.findById(idCart)
        if(!findCartId){return {error:"El carrito no existe"}}

        //Encuentro prod y lo valido
        const findProdId = await productDb.findById(idProd)
        if(!findProdId){return {error:"El producto no existe"}}

        const prodFound = findCartId.products.find(el => {
            if(el._id.toString() ===  idProd.toString()){
            return true
            }
        })
        if(prodFound){
            return {repetido: 'El producto ya fue agregado, para modificar la cantidad hacelo desde el carrito'}
        }


        await findCartId.products.push({_id:idProd})
        await this.model.replaceOne({_id:idCart},findCartId)

        return findCartId


    }

    //Eliminar productos del carrito--------------------------------------------------
    async deleteProduct(idCart, idProd){
        const findCartId = await this.model.findById(idCart)
        if(!findCartId){return {error:"No se encontro el carrito pedido"}}

        const findProdId = await productDb.findById(idProd)
        if(!findProdId){return {error:"el producto no existe"}}

        const nuevoCarrito  = []
        const productos = findCartId.products
    
        for(let i=0; i<productos.length; i++){
            let id = productos[i]._id

            if(id.toString() !==  idProd.toString()){
                let prodEncontrado = await productDb.findById(id).lean()
                nuevoCarrito.push(prodEncontrado)
            }
        }
        // console.log(nuevoCarrito)
        
        await this.model.findByIdAndUpdate(findCartId, {products:nuevoCarrito})
        // console.log(carritoActualizado)
        
        return {succes:'Producto eliminado con exito'}

    } 

    //Vaciar Carrito --------------------------------------------------------------------
    async vaciarCarrito(idCart){
        const findCartId = await this.model.findById(idCart)
        if(!findCartId){return {error:"No se encontro el carrito pedido"}}

        const productos = findCartId.products
        const length = productos.length

        const carritoVacio = productos.splice(length)

        await this.model.findByIdAndUpdate(findCartId, {products:carritoVacio})

        return {succes:'Productos eliminados'}

    }
}

const cartsManager = new Carts(cartDb)

export default cartsManager