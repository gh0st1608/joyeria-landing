import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreatePaymentUseCase } from '../application/create.application';
import { CreateOrderDto } from './dto/create.dto';
import { ExecutePaymentUseCase } from '../application/execute.application';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly executePaymentUseCase: ExecutePaymentUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateOrderDto) {
     return await this.createPaymentUseCase.execute(body);
  }

  @Get()
  async execute(@Query('token') tokenPayment: string) {
    if (!tokenPayment) {
      throw new Error('Token de pago no proporcionado');
    }
    return this.executePaymentUseCase.execute(tokenPayment);
  }

}