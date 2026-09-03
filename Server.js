const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors({
    origin: 'https://liftingup.netlify.app',           // permite cualquier origen
    credentials: true      // permite cookies / headers autorizacion
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor API corriendo');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});


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
const rutinasRoutes = require('./routes/rutinas');
const asistenciaRoutes = require('./routes/asistencia');
const ejerciciosRoutes = require('./routes/ejercicios');

// Rutas base
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/admins', adminsRoutes);
app.use('/api/rutinas', rutinasRoutes);
app.use('/api/asistencia', asistenciaRoutes);
app.use('/api/ejercicios', ejerciciosRoutes);

app.get('/', (req, res) => {
    res.send('Servidor API LIFTING UP funcionando correctamente');
});

// Configuración del puerto
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});