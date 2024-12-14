import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      if (origin === 'http://localhost:4200' || origin === "http://localhost:*" ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });
  await app.listen(4000);
  console.log('GraphQL server is running on http://localhost:4000/graphql');
}
bootstrap();
