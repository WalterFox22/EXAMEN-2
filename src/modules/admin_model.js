
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const adminModel = {
    // Registro de administrador
    async registerAdminModel(newAdmin) {
        const url= process.env.URL_BDD_ADMIN; //Almacena el enlace
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newAdmin),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        return data;
    },

    // Login de administrador
    async loginAdminModel(username, password) {
        const url= process.env.URL_BDD_ADMIN; 
        const peticion = await fetch(url)
        const admins = await peticion.json()
        const admin = admins.find(adminDJ => adminDJ.username === username)
        if (!admin) {
            return { error: "Username o password bad"};
        }
        const passwordMatch = await bcrypt.compare(password,admin.password)
        if (admin && passwordMatch){
            return admin
        }
        else{
            return {error:"Username o password bad"}
        }
    },

    // // Eliminar un producto por ID
    // async deleteProductModel(productId) {
    //     const response = await fetch(`${process.env.URL_BDD_PRODUCTS}/${productId}`, {
    //         method: 'DELETE',
    //     });
    //     const data = await response.json();
    //     return data;
    // },
};

export default adminModel;
