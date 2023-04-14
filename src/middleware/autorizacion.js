const justAdmin = (rol) => {
    return (req, res, next) => {
        if (req.user?.rol === rol) return next()
        return next({error:'Solo para personas autorizadas'})
    }
}

export {justAdmin}