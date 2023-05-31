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
    async addProduct({title, description, price, thumbnail, code, stock, category}){

        const findCode = await this.model.findOne({code})

        if(findCode){
            return {error:"Codigo repetido"}
        }

        if(!title || !description || !price || !code || !stock || !category){
            return {error:"Faltan una propiedad"}
        }

        if(price<0){
        }
        if(stock<0){
            return {error:"El stock debe ser un numero positivo"}
        }
                
        const newProd = await this.model.create({
            title:title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            category: category
        })

        console.log(newProd)
        
        return {succes:'El producto fue agregado correctamente' + newProd}

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

        return {succes:`Producto ${findId.title} actualizado con exito`}
    }

    //Eliminar producto -------------------------------------------------------
    async deleteProduct(prodId){
        const findId = await this.model.findById(prodId)
        console.log(findId)
        if(!findId){return {error:"No se encontro el carrito pedido"}}
        await this.model.deleteOne({_id:prodId})

        return {succes:`Producto ${findId.title} eliminado con exito`}
    } 
} 

const prodManager = new ProductManager(productDb)

export default prodManager

