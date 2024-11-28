import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import adminModel from '../modules/admin_model.js';
import { createtoken } from '../middlewares/auth.js'; // Asegúrate de tener un middleware para crear el token
//import { v2 as cloudinary } from 'cloudinary';

const saltRounds = 10;

const registerAdminController = async (req, res) => {
    const { password, ...otherDataAdmin } = req.body;
    const hasehedPassword = await bcrypt.hash(password,saltRounds)
    const adminData = {
        id: uuidv4(),
        password:hasehedPassword,
        ...otherDataAdmin
    }
    
    try {
        const admin = await adminModel.registerAdminModel(adminData);
        res.status(201).json(admin)
    } catch (error) {
        console.log(error);
        
        //res.status(500).json(error)
        //res.status(500).json({ error: 'Error al registrar administrador', details: error });
    }
};

const loginAdminController = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const admin = await adminModel.loginAdminModel(username, password);

        // Validaciones sobre el login de un administrador ya que se tiene que registrar con el rol de admin 
        // Validar si existe un error o si el usuario no es un administrador
        if (admin.error || admin.role !== "admin") {
            return res.status(403).json({ error: "Acceso denegado. Solo los administradores pueden iniciar sesión." });
        }

        // Verificar si la contraseña es válida
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Credenciales incorrectas." });
        }


        // Crear el token de autenticación
        const token = createtoken(admin);

        res.status(200).json({ admin, token });
    } catch (error) {
        res.status(500).json(error);
    }
};

// const deleteProductController = async (req, res) => {
//     const { id } = req.params;
//     try {
//         // Obtener información del producto a eliminar (por ejemplo, en caso de necesitar public_id de Cloudinary)
//         const product = await fetch(`${process.env.URL_BDD_PRODUCTS}/${id}`).then((res) => res.json());

//         // Eliminar la imagen asociada del producto en Cloudinary
//         if (product.public_id) {
//             await cloudinary.uploader.destroy(product.public_id);
//         }

//         // Eliminar el producto de la base de datos
//         const result = await adminModel.deleteProductModel(id);
//         res.status(200).json({ msg: 'Producto eliminado correctamente', result });
//     } catch (error) {
//         res.status(500).json({ error: 'Error al eliminar producto', details: error });
//     }
// };

export { registerAdminController, loginAdminController};
