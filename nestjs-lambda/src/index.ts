/*
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
*/
import 'reflect-metadata';

import { createLambda } from './functions/core/create-lambda';
import { ReadHandler } from './functions/read/read.handler';
import { CreateHandler } from './functions/create/create.handler';

const read = createLambda(ReadHandler);
const create = createLambda(CreateHandler);

export { read, create };
