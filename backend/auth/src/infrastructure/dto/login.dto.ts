import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {

  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
