import request from 'supertest';
import express from 'express';
import clienteRouter from './src/routes/clientes_routes.js'; // Ajusta la ruta según tu estructura
import {
    registroClienteController,
    loginClienteController,
    getClienteByIDController,
    actualizarClienteController,
    eliminarClienteController
} from './src/controllers/clientes_controller.js';

import { verifytoken } from './src/middlewares/auth.js';

jest.mock('./src/controllers/clientes_controller.js', () => ({
    registroClienteController: jest.fn(async (req, res) => res.status(201).json({ id: 'cliente-id', username: 'testuser' })),
    loginClienteController: jest.fn(async (req, res) => res.status(200).json({ token: 'mocked-token', cliente: { id: 'cliente-id', username: 'testuser' } })),
    getClienteByIDController: jest.fn(async (req, res) => res.status(200).json({ id: req.params.id, username: 'testuser' })),
    actualizarClienteController: jest.fn(async (req, res) => res.status(200).json({ id: req.params.id, ...req.body })),
    eliminarClienteController: jest.fn(async (req, res) => res.status(200).json({ message: 'Cliente eliminado' })),
}));

jest.mock('./src/middlewares/auth.js', () => ({
    verifytoken: jest.fn((req, res, next) => {
        req.user = { id: 'mocked-user-id' }; // Simula un usuario autenticado
        next();
    }),
}));

const app = express();
app.use(express.json());
app.use('/api', clienteRouter);

describe('Clientes Routes', () => {
    test('POST /api/clientesDj/registro should register a new client', async () => {
        const response = await request(app)
            .post('/api/clientesDj/registro')
            .send({ username: 'testuser', password: 'testpass' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 'cliente-id', username: 'testuser' });
    });

    test('POST /api/clientesDj/login should log in a client successfully', async () => {
        const response = await request(app)
            .post('/api/clientesDj/login')
            .send({ username: 'testuser', password: 'testpass' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', 'mocked-token');
        expect(response.body.cliente).toEqual({ id: 'cliente-id', username: 'testuser' });
    });

    test('GET /api/clientesDj/:id should return client details', async () => {
        const response = await request(app)
            .get('/api/clientesDj/mocked-id')
            .set('Authorization', 'Bearer mocked-token');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 'mocked-id', username: 'testuser' });
    });

    test('PUT /api/clientesDj/:id should update client details', async () => {
        const updatedData = { username: 'updateduser' };
        const response = await request(app)
            .put('/api/clientesDj/mocked-id')
            .set('Authorization', 'Bearer mocked-token')
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 'mocked-id', ...updatedData });
    });

    test('DELETE /api/clientesDj/:id should delete a client', async () => {
        const response = await request(app)
            .delete('/api/clientesDj/mocked-id')
            .set('Authorization', 'Bearer mocked-token');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Cliente eliminado' });
    });
});
