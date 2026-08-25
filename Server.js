const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
// Configuración permisiva de CORS para producción y local
app.use(cors({
    origin: '*', // Permite peticiones desde Netlify, Localhost y cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true
}));

// Manejar de forma explícita las peticiones preflight (OPTIONS)
app.options('*', cors());
app.use(express.json());

// Importar Rutas
const usuariosRoutes = require('./routes/usuarios');
const adminsRoutes = require('./routes/adminsRoutes');

// Rutas base
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/admins', adminsRoutes);

app.get('/', (req, res) => {
    res.send('Servidor API LIFTING UP funcionando correctamente');
});

// Configuración del puerto
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});