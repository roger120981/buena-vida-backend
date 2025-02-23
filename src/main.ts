import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionInterceptor } from './common/interceptors/http-exception.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true, skipMissingProperties: false }));
  app.useGlobalInterceptors(new HttpExceptionInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Buena Vida ADHC')
    .setDescription('The ADHC API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useLogger(['log', 'warn', 'error']);

  await app.listen(4000);
}
bootstrap();
