'use strict';

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { CrudService } from '../crud/crud.service';

export default async (event): any => {
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
