import { Router } from 'express';
import {verifytoken} from '../middlewares/auth.js'
import { createProductController, updateProductController } from '../controllers/products_controller.js';

const router = Router();


// RUTAS PRIVADAS

// Ruta para actualizar un producto por ID
router.put('/productosDJ/admin/:id',verifytoken ,updateProductController);
// Crear productos 
router.post('/productosDJ/admin',verifytoken, createProductController)

export default router;
