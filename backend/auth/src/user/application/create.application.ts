// src/application/CategoryProducts/create-CategoryProduct.use-case.ts

import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';

import { IUserRepository } from '../domain/repository/user.repository'
import { CreateUserDto } from '../infrastructure/dto/create.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') 
    private readonly userRepository: IUserRepository) {
    }

  async execute(user: CreateUserDto): Promise<User> {
    const entityUser = new User(user)  // MongoDB generará el ID automáticamente
    return this.userRepository.create(entityUser);
  }
}