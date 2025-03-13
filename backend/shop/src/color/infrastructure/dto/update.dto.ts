import { IsString, IsOptional } from 'class-validator';

export class UpdateColorDto {
  @IsOptional()  // Usamos IsOptional porque puede que no actualices todos los campos
  @IsString()    // Validamos que sea una cadena de texto
  name?: string;  // Usamos `?` para que sea opcional al actualizar
}