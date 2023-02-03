const fs = require('fs')

class ProductManager{
    constructor(path){
        this.path=path
        fs.writeFileSync(this.path,"[]")
    }

    addProduct({title, description,code}){
        const products = JSON.parse(fs.readFileSync(this.path, 'utf8'))

        let id=products.length + 1  
        const prod= new Product({title,description,code,id})
        
        const findCode = products.find(el => el.code === code );
        if(findCode){
            console.log("codigo repetido en producto: " + title)
        } else{
            products.push(prod);
            fs.writeFileSync(this.path, JSON.stringify(products))
        }  
    }
}

class Product{
    constructor({title, description,code, id}){
        if(title == undefined || description == undefined || code == undefined){
            return console.log("Falta una propiedad")
        }
        this.title = title,
        this.description = description,
        this.code = code,
        this.id = id
    }
}

const prodManager=new ProductManager('products.json')
prodManager.addProduct({title:"Book 1", description:"Description 1",code:"1A"})
prodManager.addProduct({title:"Book 2", description:"Description 1",code:"2A"})
prodManager.addProduct({title:"Book 3", description:"Description 1",code:"3A"})
prodManager.addProduct({title:"Book 4", description:"Description 1",code:"4A"})