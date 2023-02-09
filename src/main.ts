import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'test-session-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
