import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreatePaymentUseCase } from '../application/create.application';
import { ExecutePaymentUseCase } from '../application/execute.application';
import { CreateOrderDto } from './dto/create.dto';
import { PaymentStatusUseCase } from '../application/send-status.application';
import { GetListPaysUseCase } from '../application/get-pays.application';


@Controller('payment')
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly executePaymentUseCase: ExecutePaymentUseCase,
    private readonly getStatusPaymentUseCase: PaymentStatusUseCase,
    private readonly getListPaysUseCase: GetListPaysUseCase
  ) {}

  @Post()
  async create(@Body() body: CreateOrderDto) {
     return  this.createPaymentUseCase.execute(body);
  }

  @Get('/list')
  async getList() {
     return  this.getListPaysUseCase.execute();
  }

  @Get()
  async execute(@Query('token') tokenPayment: string) {
    if (!tokenPayment) {
      throw new Error('Token de pago no proporcionado');
    }
    await this.executePaymentUseCase.execute(tokenPayment);
    return { status: 'success', message: 'Pago en proceso' }
  }

  @Post('/webhook-get-status')
  async handleWebhook(@Body() body: any) {
      if (body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
        const orderId = body.resource.supplementary_data.related_ids.order_id;
        await this.getStatusPaymentUseCase.sendStatus(orderId, "COMPLETED");
    }
      return { message: "Webhook recibido correctamente" };
  }

}