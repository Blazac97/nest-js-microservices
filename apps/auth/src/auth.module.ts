import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { PrismaModule } from './prisma';
import { BcryptModule, RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ValidationModule } from './validation/validation.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';

@Module({
  imports: [
    PrismaModule,
    ValidationModule,
    BcryptModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    RmqModule,
    UsersModule,
    PassportModule,
    // Конфигурируем JWT модуль. Токен будет жить 12 часов.
    JwtModule.register({ secret: jwtSecret, signOptions: { expiresIn: '12h' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
