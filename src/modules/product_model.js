import dotenv from 'dotenv';
dotenv.config();

const productModel = {
    // Actualizar un producto por ID
    async updateProductModel(productId, updatedData) {
        try {
            const url = `${process.env.URL_BDD_PRODUCTS}/${productId}`;
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
                headers: { 'Content-Type': 'application/json' },
            });

            // Verificar la peticion
            if (!response.ok) {
                throw new Error(`Error al actualizar el producto: ${response.statusText}`);
            }

            // Retornar producto actualizado
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error en updateProductModel: ${error.message}`);
        }
    },
};

export default productModel;
