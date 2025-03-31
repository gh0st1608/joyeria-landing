// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INotificationRepository } from '../domain/repository/notification.repository';
import { EmailService } from '../service/mailing.service';
import { Notification as NotificationMongoose} from './schemas/notification.schema';
import { Contact } from '../../contact/domain/entities/contact.entity'

@Injectable()
export class NotificationInfrastructureRepository implements INotificationRepository {
  constructor(
    @InjectModel(NotificationMongoose.name) private notificationModel: Model<NotificationMongoose>,
    private readonly emailService: EmailService,
) {}

  // Implementación del método para crear un usuario
  async sendEmail(contact: Contact): Promise<void> {
    const contactEntiy = contact.properties();  // Suponiendo que 'Contact' tiene un campo 'email'
    const email = contactEntiy.email;
    const subject = contactEntiy.subject;
    const message = contactEntiy.message;
    try {
      // Llamar al servicio de correo para enviar el email
      await this.emailService.sendEmail(email, subject, message);
  
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('No se pudo enviar el correo');
    }
  }

  async sendSMS(): Promise<void> {
    
  }

}
