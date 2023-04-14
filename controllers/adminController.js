const adminForm = (req, res, next) =>{
    res.render('admin', {
        titlePage:'Solo administradores',
    })  
}

export {adminForm}