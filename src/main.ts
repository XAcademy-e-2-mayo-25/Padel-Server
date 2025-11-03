import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //se aplicaran reglas de validaciones y transformaciones a todos los endpoint que usen dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // elimina propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // lanza error 400 si el body trae propiedades desconocidas
      transform: true,            // casteo de datos para los dto
    }),
  );

  // solucionar problemas de CORS para el frontend en localhost:4200
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
