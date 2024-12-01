import dotenv from 'dotenv';
dotenv.config();



const productModel = {

    async getAllProductsModel(){
        const peticion = await fetch(process.env.URL_BDD_PRODUCTS)
        const data = await peticion.json()
        return data
    }
    ,


    async getProductsByIdModel(productId) {
        const response = await fetch(`${process.env.URL_BDD_PRODUCTS}/${productId}`);
        if (!response.ok) {
            return {error:"Producto no encontrado"}
        }
        const data = await response.json()
        return data
    },


    // Crear un producto
    async createProductModel(newProduct) {
        const url = process.env.URL_BDD_PRODUCTS; // Asegúrate de que esta URL esté configurada en tu archivo .env
        const peticion = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await peticion.json();
        return data;
    },

    // Actualizar un producto por ID 
    async updateProductModel(productId, updateProductModel) {
        const url = `${process.env.URL_BDD_PRODUCTS}/${productId}`
        // ENVIAR INFO A BDD
        const peticion = await fetch(url,{
            method:"PUT",
            body:JSON.stringify(updateProductModel),
            headers:{'Content-Type':"application/json"}
        })
        // OBTENER REPUESTA DE BDD
        const data = await peticion.json()
        // MANDAR RESPUESTA A CONTROLADOR
        return data
    },

    // Elimina un producto por su ID
    async deleteProductModel (id) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            return deletedProduct; // Retorna el producto eliminado o null si no existe
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }
    
};

export default productModel;
