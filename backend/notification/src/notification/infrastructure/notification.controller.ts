import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateNotificationUseCase } from '../application/create.application';
import { CreateContactDto } from './dto/create.dto';

@Controller('send')
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase
  ) {}

  @Post('mail')
  async create(@Body() body: CreateContactDto) {
    try {
      // Aquí ejecutas el caso de uso que maneja la lógica de envío
      await this.createNotificationUseCase.execute(body);

      // Si todo sale bien, regresas una respuesta exitosa
      return { success: true, message: 'Mensaje enviado exitosamente.' };
    } catch (error) {
      // Si ocurre un error, puedes manejarlo aquí
      // Lanza una excepción con un mensaje personalizado
      throw new HttpException(
        'Error en el envío del mensaje: ' + error.message,
        HttpStatus.BAD_REQUEST, // Usamos BAD_REQUEST porque es un error de entrada del cliente
      );
    }
  }
}
