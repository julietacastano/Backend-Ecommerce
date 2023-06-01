import { productDb } from './mongoManager.js';

class ProductManager{
    constructor (model){
        this.model = model
    }

    //Pedir array de productos --------------------------------------------------
    async getProducts(pagina, limit, offset){

        const skip = pagina > 1 ? offset : 0

        const products = this.model.find().limit(limit).skip(skip).lean()

        return products
    }

    //Buscador ------------------------------------------------------------
    async buscador(search){
        const products = await productDb.find({
            $text:{$search:search}
        }).lean()

        return products
    
    }

    //Agregar producto ----------------------------------------------------------------
    async addProduct({titulo, descripcion, precio, codigo, stock, categoria}){
        const findCode = await this.model.findOne({codigo})

        if(findCode){
            return {error:"Código de producto repetido, por favor ingresar uno diferente"}
        }
                
        await this.model.create({
            titulo:titulo,
            descripcion: descripcion,
            precio: precio,
            codigo: codigo,
            stock: stock,
            categoria: categoria
        })
        
        return {succes:'El producto fue agregado correctamente'}

    }  

    //Pedir producto por ID -------------------------------------------------
    async getProductById(prodId){
        const producto = await this.model.findById(prodId).lean()
        if(!producto){return console.log("No se encontro el producto")}

        return {producto}
    }

    //Actualizar producto ------------------------------------------------------
    async updatePrduct(prodId, newData){
        const findId = await this.model.findById(prodId)
        if(!findId){return {error:"No se encontro el carrito pedido"}}

        Object.assign(findId, newData)
        await this.model.updateOne({_id:prodId}, {$set:findId})

        return {succes:`Producto ${findId.titulo} actualizado con exito`}
    }

    //Eliminar producto -------------------------------------------------------
    async deleteProduct(prodId){
        const findId = await this.model.findById(prodId)
        console.log(findId)
        if(!findId){return {error:"No se encontro el carrito pedido"}}
        await this.model.deleteOne({_id:prodId})

        return {succes:`Producto ${findId.titulo} eliminado con exito`}
    } 
} 

const prodManager = new ProductManager(productDb)

export default prodManager

