import { createtoken, verifytoken } from './src/middlewares/auth.js';
import jwt from 'jsonwebtoken';

// Mock de jsonwebtoken
jest.mock('jsonwebtoken');

describe('Middleware de autenticación', () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = { headers: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    test('createtoken debería generar un token válido', () => {
        const userInfo = { id: 'user-id', username: 'admin' };

        // Simula el comportamiento de jsonwebtoken.sign
        jwt.sign.mockReturnValue('mocked-token');

        const token = createtoken(userInfo);

        expect(token).toBe('mocked-token');
        expect(jwt.sign).toHaveBeenCalledWith(userInfo, 'secret_key', { expiresIn: '2h' });
    });

    test('verifytoken debería devolver un error si no se proporciona un token', () => {
        mockReq.headers.authorization = '';

        verifytoken(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Token no proporcionado. Inicie sesión por favor"
        });
    });

    test('verifytoken debería devolver un error si el token no es válido', () => {
        mockReq.headers.authorization = 'Bearer invalid_token';
        jwt.verify.mockImplementation((token, secret, callback) => callback(new Error('Token inválido')));

        verifytoken(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Fallo al autentificar" });
    });

    test('verifytoken debería llamar next() si el token es válido', () => {
        const decodedToken = { id: 'user-id', username: 'admin' };
        mockReq.headers.authorization = 'Bearer valid_token';
        jwt.verify.mockImplementation((token, secret, callback) => callback(null, decodedToken));

        verifytoken(mockReq, mockRes, mockNext);

        expect(mockReq.user).toEqual(decodedToken);  // Verifica que se agregue el usuario a req.user
        expect(mockNext).toHaveBeenCalled();
    });
});
