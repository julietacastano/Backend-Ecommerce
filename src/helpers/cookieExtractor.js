const cookieExtractor = (req,res,next) =>{
    let token = null
    if(req && req.cookies){
        token = req.cookies['tokenJWT']
    }
    return token
}

export default cookieExtractor