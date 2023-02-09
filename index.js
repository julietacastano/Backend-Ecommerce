import fs from 'fs'

class ProductManager{
    constructor(path){
        this.path=path
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
    }

    addProduct({title, description,price,thumbnail,code,stock}){
        const products = JSON.parse(fs.readFileSync(this.path, 'utf8'))

        let id=products.length + 1  
        const prod= new Product({title,description,price,thumbnail,code,stock, id})

        const findCode = products.find(el => el.code === code );
        if(findCode){
            console.log("codigo repetido en producto: " + title)
        } else{
            products.push(prod);
            fs.writeFileSync(this.path, JSON.stringify(products))
        } 
        return 
    }  

    getProducts(){
        const products = JSON.parse(fs.readFileSync(this.path, 'utf8'))
        return products
    }

    getProductById(prodId){
        const products = JSON.parse(fs.readFileSync(this.path, 'utf8'))
        const findId = products.find(el => el.id == prodId);

        if(findId){
            console.log("Encontramos producto, titulo " + findId.title )
            return findId
        }else{
            console.log("No encontramos el producto")
            return {error:"No se encontro el Id ingresado"}
        }
        return
    }

    updatePrduct(prodId, newData){
        const products = JSON.parse(fs.readFileSync(this.path, 'utf8'))
        const updateId = products.findIndex(el => el.id === prodId);
        
        products[updateId]={
            ...products[updateId],
            ...newData
        }

        fs.writeFileSync(this.path, JSON.stringify(products))
    }

    deleteProduct(prodId){
        const products = JSON.parse(fs.readFileSync(this.path, 'utf8'))
        const deleteId = products.findIndex(el => el.id === prodId);
        
        const prodSplice = products.splice(deleteId,1)
        fs.writeFileSync(this.path, JSON.stringify(products))
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

export default ProductManager

const prodManager=new ProductManager('products.json')
prodManager.addProduct({title:"Book 1", description:"Description 1", price:11, thumbnail:"thumbnail book 1", code:"1A", stock:5 })
prodManager.addProduct({title:"Book 2", description:"Description 2", price:12, thumbnail:"thumbnail book 2", code:"2B", stock:8 })
prodManager.addProduct({title:"Book 3", description:"Description 3", price:13, thumbnail:"thumbnail book 3", code:"3C", stock:10 })
prodManager.addProduct({title:"Book 4", description:"Description 4", price:14, thumbnail:"thumbnail book 4", code:"4D", stock:3 })

// const arrayProd = prodManager.getProducts()
// 
// console.log(arrayProd)

//prodManager.getProductById(1)
//prodManager.getProductById(5) 

//prodManager.deleteProduct(3)

//prodManager.updatePrduct(1, {title:"New Book", stock:4})

