import express from 'express'
import routerAdmin from './routes/admin_routes.js'
import dotenv from 'dotenv'

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

export default app