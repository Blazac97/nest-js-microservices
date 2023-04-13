import { NestFactory } from '@nestjs/core';
import { ProfilesModule } from './profiles.module';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProfilesModule);
  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: errors => new BadRequestException(errors),
    })
  );
  await app.listen(configService.get('PORT'));
}
bootstrap();
