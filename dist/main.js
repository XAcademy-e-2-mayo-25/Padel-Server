"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: common_1.VersioningType.URI });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Pádel API')
        .setDescription('API de reservas de canchas de pádel')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        swaggerOptions: { persistAuthorization: true },
    });
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`API: http://localhost:${port}/api`);
    console.log(`Swagger UI: http://localhost:${port}/docs`);
    console.log(`OpenAPI JSON: http://localhost:${port}/docs-json`);
}
bootstrap();
//# sourceMappingURL=main.js.map