import { Router } from 'express';
import {verifytoken} from '../middlewares/auth.js'
import { createProductController, updateProductController } from '../controllers/products_controller.js';

const router = Router();


// RUTAS PRIVADAS

// Ruta para actualizar un producto por ID
router.put('/products/admin/:id',verifytoken ,updateProductController);
// Crear productos 
router.post('/products/admin',verifytoken, createProductController)

export default router;
