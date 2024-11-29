import { Router } from 'express';
import { updateProductController } from '../controllers/product_controller.js';

const router = Router();

// Ruta para actualizar un producto por ID
router.put('/products/:id', updateProductController);

export default router;
