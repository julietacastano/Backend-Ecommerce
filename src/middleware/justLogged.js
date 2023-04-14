export const justLogged = (req,res,next) =>{
    if(!req.isAuthenticated()){
        return res.redirect('/api/sessions/login')
    }
    next()
}