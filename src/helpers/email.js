import nodemailer from "nodemailer"

const reestablecerPassMail = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from:'BookStore.com',
        to:datos.email,
        subject:'Reestablecer contraseña de BookStore',
        html:`<h1 style="text-align:center; font-family: Arial, Helvetica;">Reestablecer contraseña</h1>
            <p style="font-family: Arial, Helvetica;">Hola ${datos.nombre}, has solicitado reestablecer tu contraseña, haz click en el siguiente enlace. Este enlace es temporal, si se vence es necesario que vuelvas a solicitar otro e-mail.</p>

            <p style="font-family: Arial, Helvetica;">Por favor copia el siguiente link en el navegador:</p>
            <a>${datos.urlReset}</a>
            
            <p style="font-family: Arial, Helvetica;">Si no solicitaste este e-mail, puedes ignorarlo</p>
        `
    })
}

export {reestablecerPassMail}