import { Router } from "express";
import { actualizarClienteController, eliminarClienteController, loginClienteController, registroClienteController } from "../controllers/clientes_controller.js";
import { verifytoken } from "../middlewares/auth.js";

const router = Router();

// RUTAS PUBLICAS

// Ruta del Cliente -Registro
router.post('/clientes/registro',registroClienteController);
// Ruta de Login-Cliente
router.post('/clientes/login',loginClienteController)


// RUTAS PRIVADAS 

// Ruta de Actualización-Cliente
router.put('/clientes/:id',verifytoken,  actualizarClienteController)
// Ruta de Eliminacion-Cliente
router.delete('/clientes/:id',verifytoken,  eliminarClienteController)
// Ruta de Actualización-Cliente

export default router