'use strict';

import { NestFactory } from '@nestjs/core';
import { Context, APIGatewayProxyResult } from 'aws-lambda';
import { AppModule } from '../app/app.module';
import { CrudService } from '../crud/crud.service';
import { ReadEventInterface } from '../types/read-event.interface';

export default async (event: ReadEventInterface, context: Context): Promise<APIGatewayProxyResult> => {
  console.log('event', event);
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const crudService = appContext.get(CrudService);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: crudService.read(),
      },
      null,
      2
    ),
  };
};
