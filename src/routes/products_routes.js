import { Router } from 'express'
import {verifytoken} from '../middlewares/auth.js'
import {getAllProductsController, getAllProductsControllerByID,createProductController, updateProductController, deleteProductController } from '../controllers/products_controller.js'

const router = Router();

//RUTAS PUBLICAS 
router.get('/productosDj', getAllProductsController);
router.get('/productosDj/:id', getAllProductsControllerByID);

// RUTAS PRIVADAS

// Crear productos 
router.post('/productosDj/admin',verifytoken, createProductController);
// Ruta para actualizar un producto por ID
router.put('/productosDj/admin/:id',verifytoken ,updateProductController);
// Ruta para eliminar un producto
router.delete('/productosDj/admin/:id',verifytoken , deleteProductController);

export default router;
