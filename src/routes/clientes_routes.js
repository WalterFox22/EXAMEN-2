import { Router } from "express";
import { actualizarClienteController, eliminarClienteController, loginClienteController, registroClienteController } from "../controllers/clientes_controller.js";
import { verifytoken } from "../middlewares/auth.js";

const router = Router();

// RUTAS PUBLICAS

// Ruta del Cliente -Registro
router.post('/clients/registro',registroClienteController);
// Ruta de Login-Cliente
router.post('/clients/login',loginClienteController)


// RUTAS PRIVADAS 

// Ruta de Actualización-Cliente
router.put('/clients/:id',verifytoken,  actualizarClienteController)
// Ruta de Eliminacion-Cliente
router.delete('/clients/:id',verifytoken,  eliminarClienteController)
// Ruta de Actualización-Cliente

export default router