const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this or use host/port for other providers
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const enviarCodigoVerificacion = async (to, code) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || '"LIFTING UP" <no-reply@liftingup.com>',
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
