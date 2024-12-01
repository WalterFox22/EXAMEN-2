import express from 'express'
import routerAdmin from './routes/admin_routes.js'
import dotenv from 'dotenv'
import router_cliente from './routes/clientes_routes.js'
import productRoutes from './routes/products_routes.js'
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'
dotenv.config()

// Inicializacion de express
const app = express()


// Inicializa para la carga de imagen 
dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// las imagenes se guardan en una carperta temporal 
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));


// Variables 
app.set('port', process.env.port || 3000)  

// MIDD
app.use(express.json())


// RUTAS PRINCIPAL
app.get('/', (req,res)=>{
    res.send("Servidor levantado OK")
})

// Rutas - Admin
app.use('/api',routerAdmin)

//  Ruta - Cliente

app.use('/api',router_cliente)

//Ruta - Productos
app.use('/api', productRoutes);

export default app