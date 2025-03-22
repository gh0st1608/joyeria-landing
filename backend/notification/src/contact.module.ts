// src/contact/contact.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './contact/infrastructure/schemas/contact.schema';
import { ContactInfrastructureRepository } from './contact/infrastructure/contact.repository';
import { CreateContactUseCase } from './contact/application/create.application';

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