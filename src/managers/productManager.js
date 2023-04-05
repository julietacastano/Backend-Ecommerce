import { productDb } from './mongoManager.js';

class ProductManager{
    constructor (model){
        this.model = model
    }

    //Pedir array de productos --------------------------------------------------
    async getProducts(limit=10,priceSort=false, name='', page=1){

        if(limit<0){
            return limit=10
        }

        if(priceSort === false){
            const prodSort = await this.model.find().limit(limit).lean()
            return prodSort
        }

        const products = this.model.find({name}).limit(limit).sort({price:priceSort}).paginate({price},{limit:5, page:page}).lean()
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
            return {error:"El precio debe ser un numero positivo"}
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
        const findId = await this.model.find({_id:prodId}).lean()
        if(!findId){return {error:"No se encontro el producto"}}

        return {findId}
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

