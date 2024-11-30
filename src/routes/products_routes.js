import { Router } from 'express';
import {verifytoken} from '../middlewares/auth.js'
import {getAllProductsController, getAllProductsControllerByID,createProductController, getAllProductsModel, getProductsByIdModel, updateProductController, getAllProductsController, getAllProductsControllerByID } from '../controllers/products_controller.js';

const router = Router();

//RUTAS PUBLICAS 
router.get('/productosDJ', getAllProductsController);
router.get('/productosDJ/:id', getAllProductsControllerByID);

// RUTAS PRIVADAS

// Ruta para actualizar un producto por ID
router.put('/productosDJ/admin/:id',verifytoken ,updateProductController);
// Crear productos 
router.post('/productosDJ/admin',verifytoken, createProductController)

export default router;
