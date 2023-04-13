import Jwt  from "jsonwebtoken";

const jwtGenerator = (data) => Jwt.sign({id: data._id, name:data.name}, process.env.JWT_SECRET, {expiresIn:'1d'}) 

export default jwtGenerator