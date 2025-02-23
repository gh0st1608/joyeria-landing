import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateItembuyDto {

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  productId: string;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsNumber()    // Validamos que sea una cadena de texto
  price: number;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsNumber()    // Validamos que sea una cadena de texto
  quantity: number;

}
