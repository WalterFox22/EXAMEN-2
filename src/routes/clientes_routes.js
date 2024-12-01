import { Router } from 'express'
import { actualizarClienteController, eliminarClienteController, getClienteByIDController, loginClienteController, registroClienteController } from "../controllers/clientes_controller.js";
import { verifytoken } from "../middlewares/auth.js";

const router = Router();

// RUTAS PUBLICAS

// Ruta del Cliente -Registro
router.post('/clientesDj/registro',registroClienteController);
// Ruta de Login-Cliente
router.post('/clientesDj/login',loginClienteController)


// RUTAS PRIVADAS
router.get('/clientesDj/:id',verifytoken,getClienteByIDController)
// Ruta de Actualización-Cliente
router.put('/clientesDj/:id',verifytoken,  actualizarClienteController)
// Ruta de Eliminacion-Cliente
router.delete('/clientesDj/:id',verifytoken,  eliminarClienteController)
// Ruta de Actualización-Cliente

export default router