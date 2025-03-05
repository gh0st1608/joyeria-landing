import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/* import { Itembuy } from './itembuy.schema'; */
import { Itembuy } from '../../../itembuy/domain/entities/itembuy.entity';

// Definir el esquema de "Product" usando Mongoose
@Schema()
export class Cartbuy extends Document {

  @Prop({ required: true })
  items: Itembuy[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: false })
  active: boolean;

  // Campo "email" de tipo string, obligatorio y único

}

// Crear el esquema de Mongoose a partir de la clase "Product"
export const CartbuySchema = SchemaFactory.createForClass(Cartbuy);