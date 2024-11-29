import { v4 as uuidv4 } from 'uuid';
import productModel from '../modules/product_model.js'; 


// Controlador para actualizar un producto
const updateProductController = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    // Crear un objeto con los datos a actualizar
    const updatedData = {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price }),
        ...(stock && { stock }),
        ...(category && { category }),
        updatedAt: new Date(), 
    };

    try {
        
        const updatedProduct = await productModel.updateProductModel(id, updatedData);

        
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json({
            message: 'Producto actualizado',
            updatedProduct,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error al actualizar el producto',
            details: error.message,
        });
    }
};

export { updateProductController };
