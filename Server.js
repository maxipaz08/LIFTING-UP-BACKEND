const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
// O si prefieres configurar los headers explícitamente:
app.use(cors({
    origin: true, // Permite dinámicamente el origen de la petición (Netlify, Localhost, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
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