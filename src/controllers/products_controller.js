import { v4 as uuidv4 } from 'uuid';
import productModel from '../modules/product_model.js'; 
import { v2 as cloudinary } from 'cloudinary'

import fs from 'fs-extra'

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
    const {id} = req.params
    try {
        const tour = await productModel.updateProductModel(id,req.body)
        res.status(200).json(tour)
    } catch (error) {
        req.status(500).json({
            error: 'Error al actualizar el producto',
            details: error.message,
        })
    }
    };


const deleteProductController = async (req, res) => {
    const { id } = req.params; // Obtener el ID del producto desde los parámetros

    try {
        // Buscar y eliminar el producto en el modelo
        const deletedProduct = await productModel.deleteProductModel(id);

        // Verificar si el producto fue encontrado y eliminado
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Si el producto tiene una imagen en Cloudinary, eliminarla
        if (deletedProduct.public_id) {
            await cloudinary.uploader.destroy(deletedProduct.public_id);
        }

        // Respuesta exitosa
        res.status(200).json({
            message: 'Producto eliminado correctamente',
            deletedProduct,
        });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({
            error: 'Error al eliminar el producto',
            details: error.message,
        });
    }
};




export {
    getAllProductsController,
    getAllProductsControllerByID,
    createProductController,
    updateProductController,
    deleteProductController 
};
