import { Router } from "express";
import { loginClienteController, registroClienteController } from "../controllers/clientes_controller";

const router = Router();
// Ruta del Cliente -Registro
router.post('/clientes/registro',registroClienteController);
// Ruta de Login-Cliente
router.post('/clientes/login',loginClienteController)
// Ruta de Eliminacion-Cliente
router.delete('/clientes/:id',loginClienteController)


export default router