import Express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash"
import dotenv from "dotenv"
import cartRoutes from "./routes/cartRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { passportInitialize, sessionInitialize } from "./middleware/passportConfig.js";

dotenv.config()

const app = Express()

app.use(cookieParser())

app.use(Express.json())
app.use(Express.urlencoded({extended:true}))

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use('/static', Express.static('./public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passportInitialize, sessionInitialize) 
app.use(flash());

app.use('/products', productsRoutes)
app.use('/carts', cartRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)

const port = 8080
app.listen(port, ()=>{console.log(`conectado a puerto ${port}`)})

