import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateNotificationUseCase } from '../application/create.application';
import { CreateContactDto } from './dto/create.dto';

@Controller('send')
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase
  ) {}

  @Post('mail')
  async create(@Body() body: CreateContactDto): Promise<void> {
    await this.createNotificationUseCase.execute(body);
  }
}