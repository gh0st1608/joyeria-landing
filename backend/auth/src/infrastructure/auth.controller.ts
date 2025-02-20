import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LoginUseCase } from '../application/login.application';
import { Auth } from '../domain/entities/auth.entity';
import { AuthLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase
  ) {}

  @Post()
  async login(
    @Body() body: AuthLoginDto
  ) {
    return this.loginUseCase.execute(body);
  }
}