
const fs = require('fs')

class ProductManager{
    constructor(ruta){
        this.products=[];
        this.ruta=ruta
    }
    async writeProd(arr){
        const comoJson = JSON.stringify(arr)    
        await fs.promises.writeFile(this.ruta, comoJson) 
    }

    getProducts(){
        return this.products;
    }

    addProduct({title, description,price,thumbnail,code,stock}){
        let id=this.products.length + 1  
        const prod= new Product({title,description,price,thumbnail,code,stock, id})

        const findCode = this.products.find(el => el.code === code );
        if(findCode){
            throw new Error("codigo repetido en producto: " + title)
        } else{this.products.push(prod);}  
    }

    getProductById(prodId){
        const findId = this.products.find(el => el.id === prodId);

        if(findId){
            console.log("Encontramos producto, titulo " + findId.title )
        }else{
            console.log("No encontramos el producto")
        }
    }

    updatePrduct(prodId, newData){
        const updateId = this.products.findIndex(el => el.id === prodId);
        
        this.products[updateId]={
            ...this.products[updateId],
            ...newData
        }
    }

    deleteProduct(prodId){
        const deleteId = this.products.findIndex(el => el.id === prodId);
        
        this.products.splice(deleteId,1)
    }

} 

class Product{
    
    constructor({title, description,price,thumbnail,code,stock, id}){
        if(title == undefined || description == undefined || price == undefined || thumbnail == undefined || code == undefined || stock == undefined){
            throw new Error("Falta una propiedad")
        }

        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock,
        this.id = id
    }
    
}

const prodAdd=new ProductManager()
prodAdd.addProduct({title:"Book 1", description:"Description 1", price:11, thumbnail:"thumbnail book 1", code:"1A", stock:5 })
prodAdd.addProduct({title:"Book 2", description:"Description 2", price:12, thumbnail:"thumbnail book 2", code:"2B", stock:8 })
prodAdd.addProduct({title:"Book 3", description:"Description 3", price:13, thumbnail:"thumbnail book 3", code:"3C", stock:10 })
prodAdd.addProduct({title:"Book 4", description:"Description 4", price:14, thumbnail:"thumbnail book 4", code:"4D", stock:3 })

const arrayProd = prodAdd.getProducts()

console.log(arrayProd)

prodAdd.getProductById(1)
prodAdd.getProductById(5) 

prodAdd.deleteProduct(3)

prodAdd.updatePrduct(1, {title:"New Book", stock:4})

console.log(prodAdd.getProducts())

const write = new ProductManager('./Productos.json')
write.writeProd(arrayProd)
