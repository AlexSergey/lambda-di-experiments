import { LambdaInterface } from './interfaces';
import { NestFactory } from '@nestjs/core';
import { Type, INestApplicationContext } from '@nestjs/common';
import { AppModule } from '../../app/app.module';

let app: INestApplicationContext;

export const createLambda =
  (Handler: Type<LambdaInterface>) =>
  async (...args) => {
    if (!app) {
      app = await NestFactory.createApplicationContext(AppModule, {
        logger: ['error'],
      });
    }
    const handler = app.get(Handler);
    return handler.execute.apply(handler, [...args]);
  };
