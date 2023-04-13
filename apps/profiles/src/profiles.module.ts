import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';

import { PrismaModule } from './prisma';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from '@app/common';
import { AUTH_SERVICE } from './constants/services';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
      }),
      envFilePath: './apps/profiles/.env',
    }),
    RmqModule.register({ name: AUTH_SERVICE }),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
