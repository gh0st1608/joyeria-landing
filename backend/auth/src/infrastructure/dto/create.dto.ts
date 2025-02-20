import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateProductDto {

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  title: string;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  price: number;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  category: string;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  description: string;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  image: string;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsNumber()    // Validamos que sea una cadena de texto
  discount: number;

  @IsOptional()  // Para permitir que el estado sea opcional
  @IsBoolean()   // Validamos que sea un valor booleano
  state: boolean;
}
