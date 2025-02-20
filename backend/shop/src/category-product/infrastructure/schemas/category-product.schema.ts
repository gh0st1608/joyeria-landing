import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definir el esquema de "Product" usando Mongoose
@Schema()
export class CategoryProduct extends Document {
  /* @Prop({ required: false })
  id: string; */

  // Campo "name" de tipo string y obligatorio
  @Prop({ required: true })
  name: string;

  // Campo "email" de tipo string, obligatorio y único
  @Prop({ required: false})
  state: boolean;
}

// Crear el esquema de Mongoose a partir de la clase "Product"
export const CategoryProductSchema = SchemaFactory.createForClass(CategoryProduct);