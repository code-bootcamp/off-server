import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:5500',
      'http://freshfridge.shop:3000',
      'https://freshfridge.shop',
      'https://freshfridge.site',
      'https://freshfridge.site:8080',
    ],
    credentials: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
