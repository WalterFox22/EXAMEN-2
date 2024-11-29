import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { json } from 'express';
import { watchFile } from 'fs-extra';
dotenv.config();

const clientes_model = {

    async registroClientesUserModel (nuevoCliente) {
        const url= process.env.URL_BDD_CLIENT; //Almacena el enlace
        const peticion = await fetch(url,{
            method:"POST", body:JSON.stringify(nuevoCliente),headers:{'Content-Type':'aplication/json'}//Condiciones para que me lea 
        })
        const data = await peticion.json()
            return data  
    },

    async loginClienteUserModel (username,password){
        const url= process.env.URL_BDD_CLIENT;
        const peticion = await fetch (url);
        const clientes = await peticion.json();
        const cliente = clientes.find(cliente => cliente.username===username);
        if (!cliente) {
            return {error:"Nombre de usuario incorrecto"}
        }
        const passwordMatch = await bcrypt.compare(password,cliente.password);
        if (cliente && passwordMatch) {
            return cliente
        }else{
            return {error:"Nombre de usuario o contraseña incorrecto"}
        }
    },

    async eliminarClienteModel(clienteId){
        // CONEXIÓN A BDD
        const url = `${process.envv.URL_BDD_CLIENTS}/${clienteId}`
        // ENVIAR INFO A BDD
        const peticion = await fetch(url,{
            method:"DELETE"
        })
        // OBTENER REPUESTA DE BDD
        const data = await peticion.json()
        // MANDAR RESPUESTA A CONTROLADOR
        return data
    }
    
}

export default clientes_model