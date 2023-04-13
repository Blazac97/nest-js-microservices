import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { PrismaModule } from './prisma';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    RmqModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
