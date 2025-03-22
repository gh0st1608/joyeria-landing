// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationInfrastructureRepository} from './notification/infrastructure/notification.repository'
import { Notification, NotificationSchema } from './notification/infrastructure/schemas/notification.schema'; // Importa el esquema de usuario
import { NotificationController } from './notification/infrastructure/notification.controller';
import { CreateNotificationUseCase } from './notification/application/create.application';
import { ConfigModule } from '@nestjs/config';
import { CreateContactUseCase } from './contact/application/create.application';
import { EmailService } from './notification/service/mailing.service';
import { ContactModule } from './contact.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Esto hará que las variables estén disponibles globalmente
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    //MongooseModule.forRoot('mongodb://root:example@localhost:27017/shop?authSource=admin'), // Configura la conexión a MongoDB
    MongooseModule.forFeature(
      [
        { name: Notification.name, schema: NotificationSchema }
      ]
    ),
    ContactModule,
  ],
  controllers: [
    NotificationController
  ],
  providers: [
    CreateNotificationUseCase,
    CreateContactUseCase,
    {
      provide: 'INotificationRepository', // Proveedor para inyectar la interfaz del repositorio
      useClass: NotificationInfrastructureRepository, // Implementación que usa Mongoose
    },
    EmailService,
  ],
})
export class NotificationModule {}