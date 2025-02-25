import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateOrderUseCase } from '../application/create.application';
import { CreateOrderDto } from './dto/create.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateOrderDto) {
     return await this.createOrderUseCase.execute(body);
  }

}