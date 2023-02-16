import Express from "express";
import routerCart from "../routes/routerCarts.js";
import routerProducts from "../routes/routerProducts.js";

const port = 8080

const app = Express()

app.use(Express.json())
app.use(Express.urlencoded({extended:true}))

app.use('/api/products', routerProducts)
app.use('/api/carts',routerCart)

app.listen(port, ()=>{console.log(`conectado a puerto ${port}`)})
