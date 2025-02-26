import { IsString, IsOptional, IsBoolean, IsNumber, IsArray, IsNotEmpty } from 'class-validator';
import { Cartbuy } from '../../../cartbuy/domain/entities/cartbuy.entity';

export class CreateOrderDto {

  @IsNotEmpty()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  idCartBuy: string;

}
