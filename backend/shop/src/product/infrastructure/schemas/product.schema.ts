import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definir el esquema de "Product" usando Mongoose
@Schema()
export class Product extends Document {
  // Campo "name" de tipo string y obligatorio
  @Prop({ required: true })
  title: string;

  @Prop({ required: true})
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: false })
  discount: number;

  // Campo "email" de tipo string, obligatorio y único

}

// Crear el esquema de Mongoose a partir de la clase "Product"
export const ProductSchema = SchemaFactory.createForClass(Product);