import { Router } from "express";
import { actualizarClienteController, eliminarClienteController, loginClienteController, registroClienteController } from "../controllers/clientes_controller.js";
import { verifytoken } from "../middlewares/auth.js";

const router = Router();

// RUTAS PUBLICAS

// Ruta del Cliente -Registro
router.post('/clientesDJ/registro',registroClienteController);
// Ruta de Login-Cliente
router.post('/clientesDJ/login',loginClienteController)


// RUTAS PRIVADAS 

// Ruta de Actualización-Cliente
router.put('/clientesDJ/:id',verifytoken,  actualizarClienteController)
// Ruta de Eliminacion-Cliente
router.delete('/clientesDJ/:id',verifytoken,  eliminarClienteController)
// Ruta de Actualización-Cliente

export default router