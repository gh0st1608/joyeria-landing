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
  providers: [ContactInfrastructureRepository],
  exports: [ContactInfrastructureRepository], // Asegúrate de exportar el repositorio para usarlo en otros módulos
})
export class ContactModule {}