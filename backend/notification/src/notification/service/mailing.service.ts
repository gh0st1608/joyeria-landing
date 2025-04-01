// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configurar el transporte de Nodemailer
    this.transporter = nodemailer.createTransport({
      service: 'gmail',  // Usamos el servicio de Gmail para el transporte
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER, // Aquí va la dirección de correo
        pass: process.env.NODEMAILER_PASS,     // Aquí va la contraseña de la aplicación (no tu contraseña de Gmail)
      },
    });
  }

  // Método para enviar un correo electrónico
  async sendEmail(to: string, subject: string, body: string): Promise<any> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Erick Foo Koch 👻" <${process.env.NODEMAILER_USER}>`,  // Dirección de correo del remitente
      to: to,                       // Dirección de correo del destinatario
      subject: subject,             // Asunto del correo
      text: body,                   // Cuerpo del correo
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(info)
    } catch (error) {
      throw new Error(error);
    }
  }
}
