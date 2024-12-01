import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid'
import  clientes_model  from "../modules/clientes_model.js";
import  {createtoken}  from "../middlewares/auth.js";
import { v2 as cloudinary } from 'cloudinary'

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
        delete cliente.password
        const token = createtoken(cliente)
        res.status(200).json({cliente,token})
    } catch (error) {
        res.status(500).json(error);
    }
}


const actualizarClienteController = async(req,res) => {
    const {id} = req.params
    try {
        const cliente = await clientes_model.actualizarClienteModel(id,req.body)
        res.status(200).json(cliente)
    } catch (error) {
        req.status(500).json(error)
    }
}

const eliminarClienteController = async (req,res) => { 
    const {id} = req.params
    try {
        await clientes_model.eliminarClienteModel(id)
        res.status(200).json({msg:"Cliente eliminado"})
    } catch (error) {
        res.status(500).json(error)
    }
}
const getClienteByIDController = async (req,res) => {
    const {id} = req.params
    try {
        const tour = await clientes_model.getClienteByIdModel(id)
        res.status(200).json(tour)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllClientesControllers = async(req,res) => {
    const tours = await clientes_model.getAllClientesModel()
    res.status(200).json(tours)
}


export{
    registroClienteController,
    loginClienteController,
    actualizarClienteController,
    eliminarClienteController,
    getClienteByIDController,
    getAllClientesControllers
}