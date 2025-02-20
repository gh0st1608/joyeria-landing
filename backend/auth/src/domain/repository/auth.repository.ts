import { Auth } from "../entities/auth.entity";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthRepository {
  register(auth: Auth): Promise<string>;
  findOne(where: { [s: string]: string | number }): Promise<Auth | null>;
  update(
    where: { [s: string]: string | number },
    data: { [s: string]: string | number }
  ): Promise<void>;
}
