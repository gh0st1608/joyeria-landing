// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IContactRepository } from '../domain/repository/contact.repository';
import { Contact as ContactMongoose} from './schemas/contact.schema';
import { Contact } from '../domain/entities/contact.entity'

@Injectable()
export class ContactInfrastructureRepository implements IContactRepository {
  constructor(@InjectModel(ContactMongoose.name) private contactModel: Model<ContactMongoose>) {}

  // Implementación del método para crear un usuario
  async create(contact: Contact): Promise<Contact> {
      const contactEntity = contact.properties()
      const contactMongoose = new this.contactModel(contactEntity);
      const savedContact = await contactMongoose.save();
      console.log('savedContact',savedContact)
      return new Contact(savedContact.toObject());
  }

}
