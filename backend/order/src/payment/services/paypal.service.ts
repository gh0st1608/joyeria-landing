// src/infrastructure/paypal-auth.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PayPalAuthService {
  private readonly paypalAuthUrl = `${process.env.SANDBOX_PAYPAL}/v1/oauth2/token`;
  private readonly clientId = process.env.CLIENT_ID_PAYPAL;
  private readonly clientSecret = process.env.CLIENT_SECRET_PAYPAL;

  // Método para obtener el token de autenticación
  async getAuthToken(): Promise<string> {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');

    try {
      const response = await axios.post(this.paypalAuthUrl, data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: this.clientId,
          password: this.clientSecret,
        },
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error during PayPal authentication:', error);
      throw new Error('Failed to obtain PayPal authentication token');
    }
  }
}
