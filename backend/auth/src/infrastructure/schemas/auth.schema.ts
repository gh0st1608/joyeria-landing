import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definir el esquema de "Product" usando Mongoose
@Schema()
export class Auth extends Document {
  // Campo "name" de tipo string y obligatorio
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: number;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  refreshToken: string;

}

// Crear el esquema de Mongoose a partir de la clase "Product"
export const AuthSchema = SchemaFactory.createForClass(Auth);