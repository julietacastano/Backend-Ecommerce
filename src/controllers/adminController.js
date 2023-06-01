import { check, validationResult } from "express-validator"
import prodManager from "../managers/productManager.js"

//Panel de administrador------------------------------------------------------------
const penelAdmin = async (req, res, next) =>{
    const {pagina} = req.query
    const redex = /^[0-9]$/
    if(!redex.test(pagina)){
        return res.redirect('/admin?pagina=1')
    }

    const limit = 5
    const offset = ((pagina * limit) - limit)

    const products = await prodManager.getProducts(pagina, limit, offset)

    const msg = req.flash('message')
    
    res.render('admin', {
        nombrePagina:'Panel de administración',
        products,
        msg
    })  
}

//Agregar un producto nuevo ------------------------------------------
const crearProducto = (req,res) => {

    res.render('crear',{
        nombrePagina:'Agregar un producto',
    })
}
const publicarProducto = async(req,res)=>{
    await check('titulo').notEmpty().withMessage('El titulo no puede estar vacio').run(req)
    await check('descripcion').notEmpty().withMessage('La descripción no puede estar vacia').run(req)
    await check('precio').isFloat({min:1}).withMessage('El precio debe ser mayor a 0').run(req)
    await check('codigo').notEmpty().withMessage('El código no puede estar vacio').run(req)
    await check('stock').isNumeric().withMessage('El stock no puede estar vacio').run(req)
    await check('categoria').notEmpty().withMessage('Por favor elegi una categoria').run(req)

    let resultadoErrores = validationResult(req)
    if(!resultadoErrores.isEmpty()){
        const completado = req.body
        return res.render('crear', {
            nombrePagina:'Registro',
            errores:resultadoErrores.array(),
            completado
        })  
    }

    const agregarProd = await prodManager.addProduct(req.body)

    if(agregarProd.error){
        console.log(agregarProd.error)
        return res.render('crear', {
            nombrePagina:'Registro',
            errores:[{msg:`${agregarProd.error}`}],
            completado
        })  
    }

    req.flash('message', `${agregarProd.succes}`)
    res.redirect('/admin')
}

//Exports -----------------------------------
export {
    penelAdmin,
    crearProducto,
    publicarProducto
}