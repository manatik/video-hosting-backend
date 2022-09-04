import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const PORT = 4200;
  await app.listen(PORT, () => console.log(`Server started ${PORT}`));
}
bootstrap().then();
