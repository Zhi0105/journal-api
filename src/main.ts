import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true, whitelist: true }));
  if(process.env.API === 'DEV') {
    await app.listen(3333);
  }

  if(process.env.API === 'PROD') {
    await app.listen(process.env.PORT);
  }
}
bootstrap();
