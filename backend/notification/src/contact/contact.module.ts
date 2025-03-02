// src/contact/contact.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './infrastructure/schemas/contact.schema';
import { ContactInfrastructureRepository } from './infrastructure/contact.repository';
import { CreateContactUseCase } from './application/create.application';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
  providers: [
    CreateContactUseCase,
    {
    provide: 'IContactRepository', // Proveedor para inyectar la interfaz del repositorio
    useClass: ContactInfrastructureRepository, // Implementación que usa Mongoose
    }
  ],
  exports: [
    {
      provide: 'IContactRepository',  // Exportar para que otros módulos puedan usarlo
      useClass: ContactInfrastructureRepository,
    },
  ]
})
export class ContactModule {}