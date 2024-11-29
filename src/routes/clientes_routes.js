import { Router } from "express";
import { actualizarClienteController, eliminarClienteController, loginClienteController, registroClienteController } from "../controllers/clientes_controller.js";

const router = Router();
// Ruta del Cliente -Registro
router.post('/clientes/registro',registroClienteController);
// Ruta de Login-Cliente
router.post('/clientes/login',loginClienteController)
// Ruta de Actualización-Cliente
router.put('/clientes/:id',actualizarClienteController)
// Ruta de Eliminacion-Cliente
router.delete('/clientes/:id',eliminarClienteController)
// Ruta de Actualización-Cliente

export default router