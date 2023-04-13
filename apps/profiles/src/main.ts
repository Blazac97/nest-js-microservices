import { NestFactory } from '@nestjs/core';
import { ProfilesModule } from './profiles.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ProfilesModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
