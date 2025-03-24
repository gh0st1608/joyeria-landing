import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  bank: string;

  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  methodPayment: string;

  @IsOptional()
  @IsString()
  status?: string;

  // 🔹 Nuevos campos necesarios
  @IsNotEmpty()
  @IsString()
  payerId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  createTime: Date;
}
