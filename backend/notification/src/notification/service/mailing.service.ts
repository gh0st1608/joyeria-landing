// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class EmailService {
  private readonly oAuth2Client: OAuth2Client;
  private readonly gmail: any;

  constructor() {
    // Cargar las credenciales de OAuth2
    const credentialsPath = path.join(__dirname, './../../../../credentials.json');
    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
    console.log('credentials',credentials)

    // Crear un cliente OAuth2 con las credenciales obtenidas
    this.oAuth2Client = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret
      //credentials.installed.redirect_uris[0],  // URI de redirección
    );
    
    // Configuración de la API de Gmail
    this.gmail = google.gmail({ version: 'v1', auth: this.oAuth2Client });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<any> {
    // Aquí debes autenticar al usuario, generalmente a través de OAuth2.
    // Este es un ejemplo básico, debes manejar la autenticación antes de intentar enviar un correo.

    // Configurar el acceso con el token de acceso (deberías implementarlo en tu flujo de autenticación)
    const { tokens } = await this.oAuth2Client.getToken('AUTHORIZATION_CODE');  // Este código es obtenido al completar el flujo OAuth2.
    this.oAuth2Client.setCredentials(tokens);

    // Crear el correo electrónico
    const raw = this.createEmail(to, subject, body);
    
    // Enviar el correo utilizando la Gmail API
    const res = await this.gmail.users.messages.send({
      userId: 'me', // 'me' indica el usuario autenticado
      requestBody: {
        raw: raw,
      },
    });

    return res.data;
  }

  // Método para crear el correo en formato base64
  private createEmail(to: string, subject: string, body: string): string {
    const message = [
      `To: ${to}`,
      `Subject: ${subject}`,
      `Content-Type: text/plain; charset="UTF-8"`,
      `Content-Transfer-Encoding: base64`,
      '',
      body,
    ].join('\n');

    return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
  }
}
