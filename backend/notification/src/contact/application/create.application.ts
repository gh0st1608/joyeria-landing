// src/application/CategoryProducts/create-CategoryProduct.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { Contact } from '../domain/entities/contact.entity';

import { IContactRepository } from '../domain/repository/contact.repository'
import { CreateContactDto } from '../infrastructure/dto/create.dto';

@Injectable()
export class CreateContactUseCase {
  constructor(
    @Inject('IContactRepository') 
    private readonly contactRepository: IContactRepository) {}

  async execute(contact: CreateContactDto): Promise<Contact> {
    const entityContact = new Contact(contact)  // MongoDB generará el ID automáticamente
    return this.contactRepository.create(entityContact);
  }
}