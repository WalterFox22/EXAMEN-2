import { registerAdminController, loginAdminController } from './src/controllers/admin_controller.js';
import adminModel from './src/modules/admin_model.js';
import bcrypt from 'bcrypt';  // Importa bcrypt

jest.mock('./src/modules/admin_model.js');  // Mock del modelo
jest.mock('bcrypt');  // Mock de bcrypt

describe('Admin Controller', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = { body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('registerAdminController should register an admin', async () => {
        mockReq.body = { username: 'admin', password: 'adminpass' };

        // Simula la respuesta exitosa del modelo para el registro
        const mockAdmin = { id: 'new-id', username: 'admin', password: 'hashedPassword' };
        adminModel.registerAdminModel.mockResolvedValue(mockAdmin);

        await registerAdminController(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockAdmin);
    });

    test('loginAdminController should log in an admin successfully', async () => {
        mockReq.body = { username: 'admin', password: 'adminpass' };

        // Simula que el modelo encuentra al admin
        const mockAdmin = { id: 'admin-id', username: 'admin', password: 'hashedPassword', role: 'admin' };
        adminModel.loginAdminModel.mockResolvedValue(mockAdmin);

        // Mock para bcrypt.compare (compara la contraseña)
        bcrypt.compare = jest.fn().mockResolvedValue(true);  // Mockea bcrypt.compare para simular una comparación exitosa

        await loginAdminController(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ admin: expect.any(Object) }));
    });

    test('loginAdminController should deny access for non-admin users', async () => {
        mockReq.body = { username: 'user', password: 'userpass' };

        // Simula que el modelo no devuelve un admin
        const mockUser = { id: 'user-id', username: 'user', password: 'hashedPassword', role: 'user' };
        adminModel.loginAdminModel.mockResolvedValue(mockUser);

        await loginAdminController(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({ error: "Acceso denegado. Solo administradores" });
    });
});
