// src/application/CategoryProducts/create-CategoryProduct.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { INotificationRepository } from '../domain/repository/notification.repository'
import { CreateContactDto } from '../infrastructure/dto/create.dto';
import { IContactRepository } from '../../contact/domain/repository/contact.repository';
import { Contact } from '../../contact/domain/entities/contact.entity';

@Injectable()
export class CreateNotificationUseCase {
  constructor(
    @Inject('INotificationRepository') 
    private readonly notificationRepository: INotificationRepository,
    @Inject('IContactRepository') 
    private readonly contactRepository: IContactRepository
  ) {}

  async execute(contact: CreateContactDto): Promise<void> {
    const contactEntity = new Contact({...contact});
    const contactCreated = await this.contactRepository.create(contactEntity)  // MongoDB generará el ID automáticamente

    await this.notificationRepository.sendEmail(contactCreated)
  }
}