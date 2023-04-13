import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { RegisterDto } from './dto/register';
import { BcryptService } from '@app/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './users/dto/create-user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private bcrypt: BcryptService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const { password: userHashedPassword, ...userRest } = user;
      const success = await this.bcrypt.compare(password, userHashedPassword);
      if (success) {
        return { user: userRest };
      }
    }
    return null;
  }

  async register(data: RegisterDto) {
    const user = await this.usersService.createUser({
      ...data,
      password: await this.bcrypt.hash(data.password),
    });
    return this.login(user);
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
