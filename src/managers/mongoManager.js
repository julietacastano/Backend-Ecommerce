import mongoose from "mongoose";
import dotenv from "dotenv"
import productSchema from "../model/productModel.js";
import cartSchema from "../model/cartModel.js";
import sessionSchema from "../model/sessionModel.js";
dotenv.config()

const uli = process.env.DB_ULI

//Modelo de productos
const productDb = mongoose.model('products', productSchema)

//Modelo de carts
const cartDb = mongoose.model('cart', cartSchema)

//Modelo de session
const sessionDb = mongoose.model('session', sessionSchema)

await mongoose.connect(uli)

export{
    productDb,
    cartDb,
    sessionDb
}
