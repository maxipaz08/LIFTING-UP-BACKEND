require('dotenv').config();
const nodemailer = require('nodemailer');

// Verificación preventiva de credenciales
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("ERROR CRÍTICO: Las variables EMAIL_USER o EMAIL_PASS no están definidas.");
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Usa TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verificar conexión al iniciar el servidor
transporter.verify((error, success) => {
    if (error) {
        console.error("Error al conectar con el servidor SMTP de Gmail:", error);
    } else {
        console.log("Servidor listo para enviar emails mediante SMTP");
    }
});

// ─── Función para enviar el código de verificación ───────────────────────
const enviarCodigoVerificacion = async (email, codigo) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || `LIFTING UP <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Código de verificación - LIFTING UP',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2>¡Hola!</h2>
                <p>Tu código para verificar tu cuenta en LIFTING UP es:</p>
                <h1 style="font-size: 32px; letter-spacing: 5px; color: #007bff; margin: 20px 0;">${codigo}</h1>
                <p>Este código vencerá en 15 minutos.</p>
                <p style="font-size: 12px; color: #777;">Si no solicitaste este código, puedes ignorar este mensaje.</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

// 🔴 Exportamos la función y el transporter en un objeto
module.exports = {
    transporter,
    enviarCodigoVerificacion
};