import { cartDb } from './mongoManager.js';
import { productDb } from './mongoManager.js';

class Carts{
    constructor(model){
        this.model=model
    }

    //Muestra carritos-------------------------------------------
    async getCarts(cartId){
        const findId = await this.model.findById(cartId)
        console.log({findId})
        if(!findId){ 
        return {error:"No se encontro el carrito pedido"}
        }
    }

    //Crea carrito----------------------------------------------------------
    async createCart(){
        const newCart = await this.model.create({
            products:[],
        })
        return {succes: `Nuevo carrito creado correctamente. Id: ${newCart._id}`}
    }

    //Agregar producto al carrito ---------------------------------------
    async addToCart(idCart, idProd){
        //Encuentro carrito y lo valido 
        const findCartId = await this.model.findById(idCart)
        if(!findCartId){return {error:"No se encontro el carrito pedido"}}

        //Encuentro prod y lo valido
        const findProdId = await productDb.findById(idProd)
        if(!findProdId){return {error:"el producto no existe"}}


        await findCartId.products.push({_id:idProd})
        await this.model.replaceOne({_id:idCart},findCartId)

        return findCartId


        // if(findProd){
            // findProd.quantity++
        // }  else{
            // findCart.products.push({id:idProd, quantity:1})
        // }
    }

    async updateCart(idCart){
        const findCartId = await this.model.findById(idCart)
        if(!findCartId){return {error:"No se encontro el carrito pedido"}}
        
        const cartFound = await this.model.findById(idCart).populate('products.product')
        console.log(cartFound)
        return cartFound
    }

    async deleteProduct(idCart, idProd){
        const findCartId = await this.model.findById(idCart)
        if(!findCartId){return {error:"No se encontro el carrito pedido"}}

        const findProdId = await productDb.findById(idProd)
        if(!findProdId){return {error:"el producto no existe"}}

    
        const productDelete = await findCartId.products.deleteOne({"_id":prodId})

        return productDelete
    } 
}

const cartsManager = new Carts(cartDb)

export default cartsManager