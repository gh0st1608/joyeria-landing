import { Inject, Injectable } from "@nestjs/common";
import { Auth } from "../domain/entities/auth.entity";
import AuthAppService from "./service/auth.service";
import { AuthRegisterDto } from "../infrastructure/dto/register.dto";
import { IUserRepository } from "../domain/repository/user.repository";
import { Tokens } from "../domain/repository/auth.repository";

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository') 
    private readonly userRepository: IUserRepository) {}

    async execute(
        authRegister : AuthRegisterDto
      ): Promise<Tokens> {
        const user = await this.userRepository.findOne({email : authRegister.email});
        if(user) return null
        const refreshToken = AuthAppService.generateRefreshToken();
        const cipherPassword = await AuthAppService.cipherPassword(authRegister.password);
        const auth = new Auth(authRegister.name,authRegister.email, cipherPassword, refreshToken);
        const userRegistered = await this.userRepository.register(auth);
        const id = userRegistered.properties().id
        const accessToken = AuthAppService.generateAccessToken(id, authRegister.name);
        return { accessToken, refreshToken };
      }
}