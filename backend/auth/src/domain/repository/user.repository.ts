
import { Auth } from '../entities/auth.entity';
import { User } from '../entities/user.entity';
  
export interface IUserRepository {
/* save(user: User): Promise<UserResult>;
getAll(): Promise<UserResult>;*/
register(auth: Auth): Promise<User>
findOne(where: { [s: string]: string | number }): Promise<User | null>;
/* getById(id: string): Promise<User>; 
getByEmail(email: string): Promise<User>; */
/* getByPage(page: number, pageSize: number): Promise<UserGetByPageResult>; */
}
