import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateMaterialDto {
  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  name: string;

  @IsOptional()  // Para permitir que el estado sea opcional
  @IsBoolean()   // Validamos que sea un valor booleano
  state: boolean;

  @IsOptional()  // Permitimos que el ID sea opcional, Mongo lo manejará
  @IsString()    // Validamos que sea un string, aunque Mongo lo generará automáticamente
  id: string;
}
