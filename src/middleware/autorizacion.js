const justAdmin = (req,res, next) => {
    if(req.user?.rol !== 'admin'){
        req.flash('error', 'Solo disponible para personas autorizadas')
        return res.redirect('/products')
    }
    next()
}

export {
    justAdmin
}