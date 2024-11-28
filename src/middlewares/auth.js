import jwt, {decode} from 'jsonwebtoken'

//CREAMOS EL TOKEN
const createtoken = (userInfo) => {
    return jwt.sign(userInfo, 'secret_key',{expiresIn:'10h'})
}
// VERIFICAMOS EL TOKEN
const verifytoken= (req,res,next)=>{

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({message:"Token no proporcionado. Inicie sesión por favor"})
    }
    const token =authHeader.split(' ')[1] 
    jwt.verify(token,'secret_key',(err, decoded)=>{
        if (err) {
            return res.status(403).json({message:"Fallo al autentificar"})
        }
        req.user = decode
        next()
    })
}

export {
    createtoken,
    verifytoken
}
