import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definir el esquema de "Product" usando Mongoose
@Schema()
export class Itembuy extends Document {
  // Campo "name" de tipo string y obligatorio
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: false })
  active: boolean;

  // Campo "email" de tipo string, obligatorio y único

}

// Crear el esquema de Mongoose a partir de la clase "Product"
export const ItembuySchema = SchemaFactory.createForClass(Itembuy);