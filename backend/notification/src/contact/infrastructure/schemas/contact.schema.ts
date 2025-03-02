import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definir el esquema de "Product" usando Mongoose
@Schema()
export class Contact extends Document {
  // Campo "name" de tipo string y obligatorio
  @Prop({ required: true })
  name: string;

  @Prop({ required: true})
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  phone: string;

  @Prop({ required: false })
  active: boolean;

  @Prop({ required: false })
  created_at: Date;

  // Campo "email" de tipo string, obligatorio y único

}

// Crear el esquema de Mongoose a partir de la clase "Product"
export const ContactSchema = SchemaFactory.createForClass(Contact);