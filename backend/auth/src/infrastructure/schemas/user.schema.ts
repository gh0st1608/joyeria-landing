import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Definir el esquema de "Product" usando Mongoose
@Schema()
export class User extends Document {
  // Campo "name" de tipo string y obligatorio
  @Prop({ required: true })
  email: string;

  @Prop({ required: true})
  name: string;

  @Prop({ required: true})
  password: string;

  @Prop({ required: false})
  lastname: string;

  @Prop({ required: false})
  active: boolean;

}

// Crear el esquema de Mongoose a partir de la clase "Product"
export const UserSchema = SchemaFactory.createForClass(User);