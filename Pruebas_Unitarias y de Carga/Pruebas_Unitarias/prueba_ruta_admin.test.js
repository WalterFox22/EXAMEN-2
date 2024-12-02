import request from 'supertest'; 
import express from 'express';
import adminRouter from './src/routes/admin_routes.js'; 

jest.mock('./src/controllers/admin_controller.js', () => ({
    registerAdminController: jest.fn(async (req, res) => {
        res.status(201).json({ id: 'new-id', username: 'admin' });
    }),
    loginAdminController: jest.fn(async (req, res) => {
        res.status(200).json({ admin: { id: 'admin-id', username: 'admin' }, token: 'mocked-token' });
    }),
}));

const app = express();
app.use(express.json());
app.use('/api', adminRouter);

jest.setTimeout(10000); // Incrementamos el timeout

describe('Admin Routes', () => {
    test('POST /api/adminDj/register should register a new admin', async () => {
        const response = await request(app)
            .post('/api/adminDj/register')
            .send({ username: 'admin', password: 'adminpass' });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 'new-id', username: 'admin' });
    });

    test('POST /api/adminDj/login should log in an admin successfully', async () => {
        const response = await request(app)
            .post('/api/adminDj/login')
            .send({ username: 'admin', password: 'adminpass' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token', 'mocked-token');
    });
});
