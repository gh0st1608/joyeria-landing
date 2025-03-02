import { IsString, IsOptional, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateContactDto {

  @IsNotEmpty()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  name: string;

  @IsNotEmpty()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  subject: string;

  @IsNotEmpty()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  message: string;

  @IsNotEmpty()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  email: string;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  phone: string;



}
