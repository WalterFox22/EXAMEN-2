import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid'
import  clientes_model  from "../modules/clientes_model.js";
import  {createtoken}  from "../middlewares/auth.js";
// Variable de los altos el numero varia puede ser mas no menos
const saltosRounds =10;
//Reglas de como se debe guardar 

const registroClienteController = async (req,res) =>{
    const {password,...infoExtra} = req.body;
    const clave_encryp=await bcrypt.hash(password,saltosRounds);
    const info_cliente = {
        id:uuidv4(),
        password:clave_encryp,
        ...infoExtra
    }
    try {
        const cliente = await clientes_model.registroClientesUserModel(info_cliente);
        res.status(200).json(cliente)
    } catch (error) {
        res.status(500).json(error);
    }
}

const loginClienteController =async (req,res) =>{
    const{username,password}= req.body;
    try {
        const cliente = await clientes_model.loginClienteUserModel(username,password);
        const token = createtoken(cliente)
        res.status(200).json({cliente,token})
    } catch (error) {
        res.status(500).json(error);
    }
}
export{
    registroClienteController,
    loginClienteController
}