import Express from "express";
import  ProductManager from "./index.js";

const port = 8080

const app = Express()
app.use(Express.json())

const prodManager=new ProductManager('products.json')
const arrayProd = prodManager.getProducts()

app.get('/products', (req,res) => {
    console.log(req.query)
    let limit = req.query.limit
    const Products = arrayProd.slice(0, limit)
    res.json({Products})
})

app.get('/products/:pid', async (req,res)=>{
    console.log(req.params.pid)
    const productFound = await prodManager.getProductById(parseInt(req.params.pid))
    res.json({productFound})    
}) 

app.listen(port)
