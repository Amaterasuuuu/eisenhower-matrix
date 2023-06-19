import { IUser } from 'src/user';
import { LoginDto, TokenDto } from '../dto';

export const AuthServiceToken = Symbol('AuthService');

export interface IAuthService {
  login(data: LoginDto): Promise<TokenDto>;
  validate(token: string): Promise<IUser>;
}
