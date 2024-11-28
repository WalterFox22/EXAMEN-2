import express, { json } from 'express'

const app = express()


app.set('port', process.env.port || 3000)  

// MIDD
app.use(express.json())


// RUTAS PRINCIPAL
app.get('/', (req,res)=>{
    res.send("Servidor levantado OK")
})



export default app