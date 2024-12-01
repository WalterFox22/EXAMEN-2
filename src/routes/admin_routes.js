import { Router } from 'express';
import {
    registerAdminController,
    loginAdminController,
} from '../controllers/admin_controller.js';
// import { verifytoken } from '../middlewares/auth.js';

const router = Router();

// Ruta pública: Registro de administrador
router.post('/adminDj/register', registerAdminController);

// Ruta pública: Login de administrador
router.post('/adminDj/login', loginAdminController);

// Ruta  

// Ruta privada: Eliminar productos (se requiere autenticación)
//router.delete('/admin/products/:id', verifytoken, deleteProductController);

export default router;
