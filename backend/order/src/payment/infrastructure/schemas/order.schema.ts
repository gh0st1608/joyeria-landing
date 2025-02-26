import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definir el esquema de "Product" usando Mongoose
@Schema()
export class Order extends Document {
  // Campo "name" de tipo string y obligatorio
  @Prop({ required: true })
  cartbuyId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  transactionId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: false })
  active: boolean;

  @Prop({ required: false })
  created_at: Date;

  // Campo "email" de tipo string, obligatorio y único
}

// Crear el esquema de Mongoose a partir de la clase "Product"
export const OrderSchema = SchemaFactory.createForClass(Order);