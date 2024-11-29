import dotenv from 'dotenv';
dotenv.config();

const productModel = {
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

    // Actualizar un producto por ID (con los campos especificados)
    async updateProductModel(productId, updatedData) {
        try {
            // Filtrar solo los campos permitidos
            const allowedFields = [
                'id',
                'idProducto',
                'nombre',
                'artista',
                'genero',
                'precio',
                'formato',
                'fechaLanzamiento',
                'stock',
                'descripcion',
                'imagen',
            ];
            const filteredData = Object.keys(updatedData)
                .filter((key) => allowedFields.includes(key))
                .reduce((obj, key) => {
                    obj[key] = updatedData[key];
                    return obj;
                }, {});

            // Construir la URL y realizar la petición
            const url = `${process.env.URL_BDD_PRODUCTS}/${productId}`;
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(filteredData),
                headers: { 'Content-Type': 'application/json' },
            });

            // Verificar la petición
            if (!response.ok) {
                throw new Error(`Error al actualizar el producto: ${response.statusText}`);
            }

            // Retornar el producto actualizado
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Error en updateProductModel: ${error.message}`);
        }
    },
};

export default productModel;
