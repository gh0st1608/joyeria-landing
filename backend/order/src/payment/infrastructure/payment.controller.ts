import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CreatePaymentUseCase } from '../application/create.application';
import { ExecutePaymentUseCase } from '../application/execute.application';
import { CreateOrderDto } from './dto/create.dto';
import { PaymentStatusUseCase } from '../application/send-status.application';


@Controller('payment')
export class PaymentController {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly executePaymentUseCase: ExecutePaymentUseCase,
    private readonly getStatusPaymentUseCase: PaymentStatusUseCase
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

  @Post('/webhook-get-status')
  async handleWebhook(@Body() body: any) {
      if (body.event_type === "PAYMENT.CAPTURE.COMPLETED") {
        const orderId = body.resource.supplementary_data.related_ids.order_id;
        console.log(`✅ Pago completado - Payment ID: ${body.resource.id}`);
        // Aquí actualizas tu base de datos
        console.log('cuerpo del pago',body.resource)
        await this.getStatusPaymentUseCase.sendStatus(orderId, "COMPLETED");
    }
      return { message: "Webhook recibido correctamente" };
  }

}