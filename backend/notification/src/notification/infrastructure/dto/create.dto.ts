import { IsString, IsOptional, IsBoolean, IsNumber, IsNotEmpty, IsEmail } from 'class-validator';

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

  @IsNotEmpty()  // Aseguramos que el campo no esté vacío
  @IsEmail()    // Validamos que el campo sea un correo electrónico válido
  email: string;

  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  phone: string;



}
