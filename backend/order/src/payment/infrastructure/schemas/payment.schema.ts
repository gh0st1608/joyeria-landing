import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definir el esquema de "Product" usando Mongoose
@Schema()
export class Payment extends Document {
  // Campo "name" de tipo string y obligatorio
  /* @Prop({ required: true })
  id: string; */

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  bank: string;

  @Prop({ required: true })
  orderId: string;

  @Prop({ required: true })
  methodPayment: string;

  @Prop({ required: false })
  status: string;

  @Prop({ required: false })
  created_at: Date;

  // Campo "email" de tipo string, obligatorio y único
}

// Crear el esquema de Mongoose a partir de la clase "Product"
export const PaymentSchema = SchemaFactory.createForClass(Payment);