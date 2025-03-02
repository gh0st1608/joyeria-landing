import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateContactUseCase } from '../application/create.application';
import { Contact } from '../domain/entities/contact.entity';
import { CreateContactDto } from './dto/create.dto';

@Controller('notification')
export class ContactController {
  constructor(
    private readonly createContactUseCase: CreateContactUseCase
  ) {}

  @Post()
  async create(@Body() body: CreateContactDto): Promise<Contact> {
    return this.createContactUseCase.execute(body);
  } 
}