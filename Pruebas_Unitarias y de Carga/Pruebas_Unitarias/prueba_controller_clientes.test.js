import { 
    registroClienteController, 
    loginClienteController, 
    actualizarClienteController, 
    eliminarClienteController, 
    getClienteByIDController, 
    getAllClientesControllers 
} from './src/controllers/clientes_controller';
import clientes_model from "./src/modules/clientes_model";

jest.mock('./src/modules/clientes_model'); // Mock de los métodos del modelo

describe('Clientes Controller', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = { body: {}, params: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('registroClienteController should register a client successfully', async () => {
        mockReq.body = { username: 'testuser', password: '12345' };

        // Simula la respuesta del modelo para el registro de un cliente
        const mockRegistro = jest.spyOn(clientes_model, 'registroClientesUserModel').mockResolvedValue({
            id: 'new-id',
            username: 'testuser',
            password: 'hashedPassword'
        });

        await registroClienteController(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            id: 'new-id',
            username: 'testuser',
            password: 'hashedPassword'
        });

        mockRegistro.mockRestore();
    });

    test('loginClienteController should return an error for invalid credentials', async () => {
        mockReq.body = { username: 'wronguser', password: 'wrongpass' };

        // Simula que el modelo no encuentra al cliente
        const mockLogin = jest.spyOn(clientes_model, 'loginClienteUserModel').mockResolvedValue(null); 

        await loginClienteController(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401); // Cambié de 500 a 401 para credenciales incorrectas
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Credenciales incorrectas' });

        mockLogin.mockRestore();
    });

    test('getClienteByIDController should return a client by ID', async () => {
        mockReq.params.id = 'some-id';
        const mockCliente = { id: 'some-id', username: 'cliente1' };

        // Simula que el modelo devuelve un cliente
        jest.spyOn(clientes_model, 'getClienteByIdModel').mockResolvedValue(mockCliente);

        await getClienteByIDController(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockCliente);
    });

    test('actualizarClienteController should update client successfully', async () => {
        mockReq.params.id = 'some-id';
        mockReq.body = { username: 'Updated Name' };

        const mockUpdatedCliente = { id: 'some-id', username: 'Updated Name' };

        // Simula que el modelo actualiza un cliente
        jest.spyOn(clientes_model, 'actualizarClienteModel').mockResolvedValue(mockUpdatedCliente);

        await actualizarClienteController(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedCliente);
    });

    test('eliminarClienteController should delete a client successfully', async () => {
        mockReq.params.id = 'some-id';

        const mockCliente = { id: 'some-id', username: 'Cliente para eliminar' };

        // Simula que el modelo elimina un cliente
        jest.spyOn(clientes_model, 'eliminarClienteModel').mockResolvedValue({});
        jest.spyOn(clientes_model, 'getClienteByIdModel').mockResolvedValue(mockCliente);

        await eliminarClienteController(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ msg: "Cliente eliminado" });
    });

    test('getAllClientesControllers should return all clients', async () => {
        const mockClientes = [
            { id: '1', username: 'cliente1' },
            { id: '2', username: 'cliente2' }
        ];

        // Simula la respuesta del modelo
        jest.spyOn(clientes_model, 'getAllClientesModel').mockResolvedValue(mockClientes);

        await getAllClientesControllers(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockClientes);
    });
});
