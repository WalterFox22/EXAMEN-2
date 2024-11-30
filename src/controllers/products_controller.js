import { v4 as uuidv4 } from 'uuid';
import productModel from '../modules/product_model.js'; 

const getAllProductsController = async(req,res) => {
    const products = await productModel.getAllProductsModel()
    res.status(200).json(products)
}


const getAllProductsControllerByID = async (req, res) => {
    const {id} = req.params
    try {
        const product = await productModel.getProductsByIdModel(id)
        const status = product.error ? 404 : 200
        res.status(status).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}


const createProductController = async (req,res) => {
    const newProductData = {
        id:uuidv4(),
        ...req.body
    }
    try {
        // carga de imagen 
        const cloudinaryResponse= await cloudinary.uploader.upload(req.files.imagen.tempFilePath, {folder:'products'})
       newProductData.imagen= cloudinaryResponse.secure_url
       newProductData.public_id = cloudinaryResponse.public_id

        const producto = await productModel.createProductModel(newProductData)
        // eliminar la imagne despues de ser cargado en cloudinaria (los temporales)
       await fs.unlink(req.files.imagen.tempFilePath)
        res.status(201).json(producto)
    } catch (error) {
        res.status(500).json(error)
    }
}


// Controlador para actualizar un producto
const updateProductController = async (req, res) => {
    const { id } = req.params; // Solo se mantiene 'id'
    const { nombre, artista, genero, precio, formato, fechaLanzamiento, stock, descripcion, imagen } = req.body;

    // Crear un objeto con los datos a actualizar
    const updatedData = {
        ...(nombre && { nombre }),
        ...(artista && { artista }),
        ...(genero && { genero }),
        ...(precio && { precio }),
        ...(formato && { formato }),
        ...(fechaLanzamiento && { fechaLanzamiento }),
        ...(stock && { stock }),
        ...(descripcion && { descripcion }),
        ...(imagen && { imagen }),
        updatedAt: new Date(), // Agregar la fecha de última actualización
    };

    try {
        // Llamar al modelo para actualizar el producto
        const updatedProduct = await productModel.updateProductModel(id, updatedData);

        // Verificar si el producto fue encontrado
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Enviar respuesta exitosa
        res.status(200).json({
            message: 'Producto actualizado',
            updatedProduct,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({
            error: 'Error al actualizar el producto',
            details: error.message,
        });
    }
};



export {
    getAllProductsController,
    getAllProductsControllerByID,
    createProductController,
    updateProductController };
