import { productDb } from './mongoManager.js';

class ProductManager{
    constructor (model){
        this.model = model
    }

    async allProds(){
        const productos = this.model.find()
        return productos
    }

    //Productos --------------------------------------------------
    async getProducts(pagina, limit, offset){

        const skip = pagina > 1 ? offset : 0

        const products = this.model.find().limit(limit).skip(skip).lean()

        return products
    }

    //Buscador ------------------------------------------------------------
    async buscador(search){
        // const products = await this.model.find({
        //     $text:{$search:`${search}`}
        // })

        const products = await this.model.aggregate(
            [
                {
                $search: {
                    index: "default",
                    text: {
                    query: `${search}`,
                    path: {
                        wildcard: "*"
                    }
                    }
                }
                }
            ]
        )

        // console.log(products)

        return products
    
    }

    //Producto por ID -------------------------------------------------
    async getProductById(prodId){
        const producto = await this.model.findById(prodId).lean()
        if(!producto){return {error:"No se encontro el producto pedido"}}

        return {producto}
    }

    //Agregar producto ----------------------------------------------------------------
    async addProduct({titulo, descripcion, precio, codigo, stock, categoria, img}){
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
            categoria: categoria,
            img:img
        })
        
        return {succes:'El producto fue agregado correctamente'}

    }  

    //Editar producto ------------------------------------------------------
    async updatePrduct(prodId, newData){
        const findId = await this.model.findById(prodId).lean()
        if(!findId){return {error:"No se encontro el producto pedido"}}

        await this.model.findOneAndUpdate({_id:prodId}, newData)

        return {succes:`Producto ${findId.titulo} actualizado con exito`}
    }

    //Eliminar producto -------------------------------------------------------
    async deleteProduct(prodId){
        const findId = await this.model.findById(prodId)
        if(!findId){return {error:"No se encontro el carrito pedido"}}
        
        await this.model.deleteOne({_id:prodId})
        
        return {succes:`Producto ${findId.titulo} eliminado con exito`}

    } 
} 

const prodManager = new ProductManager(productDb)

export default prodManager

