const nodemailer = require('nodemailer');
require('dotenv').config();

// Usamos host, puerto 465 e IPv4 explícitos para Render
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Debe ser true para el puerto 465
    family: 4,    // Forzar IPv4 (soluciona el error ENETUNREACH)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // Evita fallos por certificados intermedios
    },
    connectionTimeout: 10000 // Tiempo límite de conexión de 10 segundos
});

const enviarCodigoVerificacion = async (to, code) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || '"LIFTING UP" <liftingup.app@gmail.com>',
            to,
            subject: 'Verifica tu cuenta - LIFTING UP',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                    <h2>¡Bienvenido a LIFTING UP!</h2>
                    <p>Por favor, utiliza el siguiente código de 6 dígitos para verificar tu cuenta:</p>
                    <div style="background-color: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px auto; width: fit-content; border-radius: 8px;">
                        ${code}
                    </div>
                    <p>Este código es válido por 15 minutos.</p>
                    <p>¡Recuerda revisar el casillero de spam!</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email de verificación enviado: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error al enviar el email de verificación:', error);
        return false;
    }
};

module.exports = {
    enviarCodigoVerificacion
};