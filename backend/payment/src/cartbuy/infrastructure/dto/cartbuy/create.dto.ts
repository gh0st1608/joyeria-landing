import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { CreateItembuyDto } from '../itembuy/create.dto';  // Importamos el DTO de Itembuy

export class CreateCartbuyDto {
  @IsOptional()
  @IsArray()
  items: CreateItembuyDto[];  // Usamos el DTO adecuado aquí, no el esquema de Mongoose

  @IsOptional()
  @IsNumber()
  totalPrice: number;
}