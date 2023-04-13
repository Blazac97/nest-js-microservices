import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { RpcException } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get(RmqService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: errors => {
        return new RpcException(errors);
      },
    })
  );

  const microservice = app.connectMicroservice(rmqService.getOptions('AUTH', true), {
    inheritAppConfig: true,
  });

  useContainer(microservice.select(AuthModule), { fallbackOnErrors: true });
  await app.startAllMicroservices();
}
bootstrap();
