import request from 'supertest';
import express from 'express';
import productoRouter from './src/routes/products_routes.js'; // Ajusta la ruta según tu estructura
import {
    getAllProductsController,
    getAllProductsControllerByID,
    createProductController,
    updateProductController,
    deleteProductController
} from './src/controllers/products_controller.js';

import { verifytoken } from './src/middlewares/auth.js';

jest.mock('./src/controllers/products_controller.js', () => ({
    getAllProductsController: jest.fn(async (req, res) => res.status(200).json([{ id: 'product1', name: 'Producto 1' }, { id: 'product2', name: 'Producto 2' }])),
    getAllProductsControllerByID: jest.fn(async (req, res) => res.status(200).json({ id: req.params.id, name: 'Producto específico' })),
    createProductController: jest.fn(async (req, res) => res.status(201).json({ id: 'new-product-id', ...req.body })),
    updateProductController: jest.fn(async (req, res) => res.status(200).json({ id: req.params.id, ...req.body })),
    deleteProductController: jest.fn(async (req, res) => res.status(200).json({ message: 'Producto eliminado correctamente' })),
}));

jest.mock('./src/middlewares/auth.js', () => ({
    verifytoken: jest.fn((req, res, next) => {
        req.user = { id: 'mocked-user-id' }; // Simula un usuario autenticado
        next();
    }),
}));

const app = express();
app.use(express.json());
app.use('/api', productoRouter);

describe('Productos Routes', () => {
    test('GET /api/productosDj should return all products', async () => {
        const response = await request(app)
            .get('/api/productosDj');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { id: 'product1', name: 'Producto 1' },
            { id: 'product2', name: 'Producto 2' }
        ]);
    });

    test('GET /api/productosDj/:id should return a specific product', async () => {
        const response = await request(app)
            .get('/api/productosDj/product1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 'product1', name: 'Producto específico' });
    });

    test('POST /api/productosDj/admin should create a new product', async () => {
        const newProduct = { name: 'Nuevo Producto', price: 100 };
        const response = await request(app)
            .post('/api/productosDj/admin')
            .set('Authorization', 'Bearer mocked-token')
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 'new-product-id', ...newProduct });
    });

    test('PUT /api/productosDj/admin/:id should update a product', async () => {
        const updatedProduct = { name: 'Producto Actualizado', price: 150 };
        const response = await request(app)
            .put('/api/productosDj/admin/product1')
            .set('Authorization', 'Bearer mocked-token')
            .send(updatedProduct);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 'product1', ...updatedProduct });
    });

    test('DELETE /api/productosDj/admin/:id should delete a product', async () => {
        const response = await request(app)
            .delete('/api/productosDj/admin/product1')
            .set('Authorization', 'Bearer mocked-token');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Producto eliminado correctamente' });
    });
});
