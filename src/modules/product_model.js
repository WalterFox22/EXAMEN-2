import dotenv from 'dotenv';
dotenv.config();

const productModel = {
    // Crear un producto
    async createProductModel(newProduct) {
        const url = process.env.URL_BDD_TOURS;
        const peticion = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await peticion.json();
        return data;
    },

    // Actualizar un producto por ID (solo id, name, price, description)
    async updateProductModel(productId, updatedData) {
        try {
            // Filtrar solo los campos permitidos
            const allowedFields = ['id', 'name', 'price', 'description'];
            const filteredData = Object.keys(updatedData)
                .filter((key) => allowedFields.includes(key))
                .reduce((obj, key) => {
                    obj[key] = updatedData[key];
                    return obj;
                }, {});

            const url = `${process.env.URL_BDD_PRODUCTS}/${productId}`;
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(filteredData),
                headers: { 'Content-Type': 'application/json' },
            });

            // Verificar 
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
