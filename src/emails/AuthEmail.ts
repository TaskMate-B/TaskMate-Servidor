import { transporter } from "../config/transporter"

export default class AuthEmail {
    static sendAuthToken = async (email: string, token: string): Promise<void> => {
        try {
            await transporter.sendMail({
                from: 'admin@taskmate.com',
                to: email,
                subject: 'Confirmación de cuenta',
                html: `
                    <html>
                        <body>
                            <h2>¡Hola!</h2>
                            <p>Gracias por registrarte en TaskMate. Para confirmar tu cuenta, por favor haz clic en el siguiente enlace:</p>
                            <p><a href="#">Confirmar mi cuenta</a></p>
                            <p>Tu token de confirmación es: <strong>${token}</strong></p>
                            <p>Si no has solicitado este registro, puedes ignorar este mensaje.</p>
                            <p>Saludos,<br>El equipo de TaskMate</p>
                        </body>
                    </html>
                `
            });
        } catch (error) {
            console.log(error);
        }
    }

    static sendPasswordToken = async (email: string, token: string): Promise<void> => {
        try {
            await transporter.sendMail({
                from: 'admin@taskmate.com',
                to: email,
                subject: 'Confirmación de cambio de contraseña',
                html: `
                    <html>
                        <body>
                            <h2>¡Hola!</h2>
                            <p>Recibimos una solicitud para cambiar tu contraseña en TaskMate. Para confirmar el cambio, por favor haz clic en el siguiente enlace:</p>
                            <p><a href="#"">Confirmar cambio de contraseña</a></p>
                            <p>Tu token de confirmación es: <strong>${token}</strong></p>
                            <p>Si no has solicitado este cambio, por favor ignora este mensaje.</p>
                            <p>Saludos,<br>El equipo de TaskMate</p>
                        </body>
                    </html>
                `
            });
        } catch (error) {
            console.log(error);
        }
    }
    

}