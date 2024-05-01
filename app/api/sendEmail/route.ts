import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {

        const {gmail, contraseña } = await request.json();

        // Configura el transporte de correo electrónico (ajusta los detalles según tu proveedor de correo)
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'samuelaraoz789@gmail.com', // Reemplaza con tu dirección de correo electrónico
            pass: 'wsejfgftmzazqbsn', // Reemplaza con tu contraseña
          },
        });
    
        // Configura las opciones del correo electrónico (destinatario, asunto, contenido, etc.)
        const mailOptions = {
          from: 'samuelaraoz789@gmail.com', // Reemplaza con tu dirección de correo electrónico
          to: gmail, // Reemplaza con la dirección de correo electrónico del destinatario
          subject: 'Hola Se le paso su contraseña',
          text: 'Su contraseña es '+  contraseña,
        };
    
        // Envía el correo electrónico
        const info = await transporter.sendMail(mailOptions);
        return NextResponse.json({ status: 200 });
        
      } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
       
      }
}