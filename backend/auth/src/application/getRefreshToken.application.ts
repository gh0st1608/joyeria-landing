
import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository, Tokens } from 'src/domain/repository/auth.repository';
import { IUserRepository } from 'src/domain/repository/user.repository';
import AuthAppService from './service/auth.service';

@Injectable()
export class GetNewAccessTokenUseCase {
  constructor(
    @Inject('IUserRepository') 
    private readonly authRepository: IAuthRepository) {}

async execute(refreshToken: string): Promise<Tokens | null> {
  const auth = await this.authRepository.findOne({ refreshToken });

  if (auth) {
    const accessToken = AuthAppService.generateAccessToken(
      auth._id,
      auth.name
    );
    const newRefreshToken = AuthAppService.generateRefreshToken();

    await this.authRepository.update(
      { refreshToken },
      { refreshToken: newRefreshToken }
    );

    return { accessToken, refreshToken: newRefreshToken };
  } else {
    return null;
  }
}
}