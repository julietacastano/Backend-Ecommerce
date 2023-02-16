import fs from 'fs'

class Carts{
    constructor(path){
        this.path=path
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }  
    }

    getCarts(){
        const carts = JSON.parse(fs.readFileSync(this.path, 'utf8'))
        return carts
    }

    createCart(){
        const carts = JSON.parse(fs.readFileSync(this.path, 'utf8'))
        const cart = {id:Date.now(),products:[]}
        
        carts.push(cart)

        fs.writeFileSync(this.path, JSON.stringify(carts))
        return {Subject:`El carrito ha sido añadido con exito con el id ${cart.id}`}
    }

    addToCart(idCart, idProd){
        const carts = JSON.parse(fs.readFileSync(this.path, 'utf8'))
        const findCart = carts.find(el => el.id === idCart)

        if(!findCart){
            return{error:"el carrito no se ha encontrado"}
        }

        const findProd = findCart.products.find(el => el.id === idProd)
        if(findProd){
            findProd.quantity++
        }  else{
            findCart.products.push({id:idProd, quantity:1})
        }
        
        fs.writeFileSync(this.path, JSON.stringify(carts))
        return {subject:"El producto se agrego con existo"}
    }
    
    getCart(cartId){
        const carts = JSON.parse(fs.readFileSync(this.path, 'utf8'))
        const findCart = carts.find(el => el.id === cartId)

        const productsFound = []

        findCart.products.forEach(element => {
            const products = JSON.parse(fs.readFileSync('./products.json', 'utf8'))
            const prodId = element.id
            const findId = products.find(el => el.id == prodId);
            
            const findProd = findCart.products.find(el => el.id === prodId)
            
            const prodQuantity=findProd.quantity
            productsFound.push({...findId, quantity:prodQuantity})
            
        });

        return {productsFound}
    }

}

const cartsManager = new Carts('carts.json')

export default cartsManager