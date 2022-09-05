import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://freshfridge.shop:3000'],
    credentials: true, 
  });
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
