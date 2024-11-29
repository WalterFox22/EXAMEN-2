import express from 'express'
import routerAdmin from './routes/admin_routes.js'
import dotenv from 'dotenv'
import router_cliente from './routes/clientes_routes.js'
import productRoutes from './routes/pproducts_routes.js'
dotenv.config()

// Inicializacion de express
const app = express()


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

//Ruta - Cliente

app.use('/api',router_cliente)

//Ruta - Productos
app.use('/api', productRoutes);

export default app