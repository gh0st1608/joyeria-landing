// src/application/CategoryProducts/create-CategoryProduct.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/repository/user.repository';
import AuthAppService from './service/auth.service';
import { AuthLoginDto } from '../infrastructure/dto/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') 
    private readonly userRepository: IUserRepository) {}

  async execute(authLogin: AuthLoginDto): Promise<any> {
    const email = authLogin.email
    const user = await this.userRepository.findOne({email});
    if (user) {
      const isMatchPassword = await AuthAppService.isMatchPassword(
        authLogin.password,
        user.properties().password,
      );

      if (isMatchPassword) {
        return {
          accessToken: AuthAppService.generateAccessToken(user.properties().id, authLogin.name),
          refreshToken: authLogin.refreshToken,
        };
      } else {
        return null;
      }
    } else {
      return null;
    }

  }
}