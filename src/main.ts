import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validaciones globales 
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

  //Prefix y versionado
  app.setGlobalPrefix('api');                
  app.enableVersioning({ type: VersioningType.URI }); 

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Pádel API')
    .setDescription('API de reservas de canchas de pádel')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`API: http://localhost:${port}/api`);
  console.log(`Swagger UI: http://localhost:${port}/docs`);
  console.log(`OpenAPI JSON: http://localhost:${port}/docs-json`);
}

bootstrap();

