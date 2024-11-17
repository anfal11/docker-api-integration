// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { Logger, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('API');

  app.use((req, res, next) => {
    logger.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
  });

  await app.listen(3000);
}
bootstrap();
