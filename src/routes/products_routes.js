import { Router } from 'express';
import {verifytoken} from '../middlewares/auth.js'
import { createProductController, updateProductController } from '../controllers/products_controller.js';

const router = Router();


// RUTAS PRIVADAS

// Ruta para actualizar un producto por ID
router.put('/admin/products/:id',verifytoken ,updateProductController);
// Crear productos 
router.post('/admin/products',verifytoken, createProductController)

export default router;
