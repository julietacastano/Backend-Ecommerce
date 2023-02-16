export default class Product{
    constructor({title, description,price,thumbnail,code,stock,status=true, category, id}){
        if(!title || !description || !price || !code || !stock || !category){
            throw new Error("Falta una propiedad")
        }
        
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock,
        this.status = status,
        this.category = category,
        this.id = id
    }
}