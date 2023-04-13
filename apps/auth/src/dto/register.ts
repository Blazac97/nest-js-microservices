import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Unique } from '../validation/UniqueConstraint.validator';

export class RegisterDto {
  @IsEmail()
  @Unique('user', 'email')
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
