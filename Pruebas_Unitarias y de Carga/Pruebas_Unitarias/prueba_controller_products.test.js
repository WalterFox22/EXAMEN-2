import { 
    getAllProductsController, 
    getAllProductsControllerByID, 
    createProductController, 
    updateProductController, 
    deleteProductController 
} from './src/controllers/products_controller';
import productModel from './src/modules/product_model'; 
import { v2 as cloudinary } from 'cloudinary';

jest.mock('./src/modules/product_model'); // Mock de los métodos del modelo
jest.mock('cloudinary'); // Mock de Cloudinary

describe('Products Controller', () => {

    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = { body: {}, params: {}, files: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('getAllProductsController should return all products', async () => {
        const mockProducts = [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }];
        productModel.getAllProductsModel.mockResolvedValue(mockProducts);

        await getAllProductsController(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
    });

    test('getAllProductsControllerByID should return a product by ID', async () => {
        mockReq.params.id = 'product-id';
        const mockProduct = { id: 'product-id', name: 'Product 1' };
        productModel.getProductsByIdModel.mockResolvedValue(mockProduct);

        await getAllProductsControllerByID(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockProduct);
    });

    test('createProductController should create a new product', async () => {
        mockReq.body = { name: 'New Product', price: 100 };
        mockReq.files = { imagen: { tempFilePath: 'path/to/image' } };

        // Simula la respuesta de Cloudinary
        const mockImageResponse = { secure_url: 'url_to_image', public_id: 'image_id' };
        cloudinary.uploader.upload.mockResolvedValue(mockImageResponse);

        // Simula la respuesta del modelo para crear el producto
        const mockCreatedProduct = { id: 'new-id', name: 'New Product', price: 100, imagen: mockImageResponse.secure_url };
        productModel.createProductModel.mockResolvedValue(mockCreatedProduct);

        await createProductController(mockReq, mockRes);

        // Verifica que la respuesta tenga el código de estado 201 (Producto creado)
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(mockCreatedProduct);
    });

    test('updateProductController should update an existing product', async () => {
        mockReq.params.id = 'product-id';
        mockReq.body = { name: 'Updated Product' };

        const mockUpdatedProduct = { id: 'product-id', name: 'Updated Product' };
        productModel.updateProductModel.mockResolvedValue(mockUpdatedProduct);

        await updateProductController(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedProduct);
    });

    test('deleteProductController should delete a product by ID', async () => {
        mockReq.params.id = 'product-id';

        const mockProduct = { id: 'product-id', name: 'Product to delete', public_id: 'image_id' };
        productModel.getProductsByIdModel.mockResolvedValue(mockProduct);
        productModel.deleteProductModel.mockResolvedValue({});

        cloudinary.uploader.destroy.mockResolvedValue({});

        await deleteProductController(mockReq, mockRes);

        // Cambié el código de estado esperado de 201 a 200 para la eliminación
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Producto eliminado correctamente', deletedProduct: mockProduct });
    });
});
