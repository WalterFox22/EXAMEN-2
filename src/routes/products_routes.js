import { Router } from 'express'
import {verifytoken} from '../middlewares/auth.js'
import {getAllProductsController, getAllProductsControllerByID,createProductController, updateProductController, deleteProductController } from '../controllers/products_controller.js'

const router = Router();

//RUTAS PUBLICAS 
router.get('/productosDJ', getAllProductsController);
router.get('/productosDJ/:id', getAllProductsControllerByID);

// RUTAS PRIVADAS

// Crear productos 
router.post('/productosDJ/admin',verifytoken, createProductController);
// Ruta para actualizar un producto por ID
router.put('/productosDJ/admin/:id',verifytoken ,updateProductController);

// Ruta para eliminar un producto
router.delete('/products/:id', deleteProductController);

export default router;
