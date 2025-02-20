// src/infrastructure/product.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../domain/repository/user.repository';
import { User as UserMongoose} from './schemas/user.schema';
import { User } from '../domain/entities/user.entity'

@Injectable()
export class UserInfrastructureRepository implements IUserRepository {
  constructor(
    @InjectModel(UserMongoose.name) private userModel: Model<UserMongoose>
  ) {}

  async findOne(where: { [s: string]: string | number }): Promise<User | null> {
    const user = await this.userModel.findById(where).lean().exec();
    if (!user) return null;
    return new User(user.toObject())
  }
}
