export const justLogged = (req,res,next) =>{
    if(!req.isAuthenticated()){
        return next({error: 'Error de autorizacion'})
    }
    next()
}