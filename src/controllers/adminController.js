const penelAdmin = (req, res, next) =>{
    res.render('admin', {
        titlePage:'Solo administradores',
    })  
}

export {penelAdmin}