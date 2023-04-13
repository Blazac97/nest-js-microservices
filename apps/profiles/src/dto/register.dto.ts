// Создаём Data Transfer Object для редактирования профиля.
// DTO для создания профиля мы используем при регистрации.
import { Profile } from '../prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: Profile['phone'];

  @IsNotEmpty()
  address: Profile['address'];

  @IsNotEmpty()
  name: Profile['name'];

  @IsNotEmpty()
  lastName: Profile['lastName'];

  @IsNotEmpty()
  password: string;
}
