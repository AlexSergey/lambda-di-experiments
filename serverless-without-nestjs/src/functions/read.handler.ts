'use strict';

import { Context, APIGatewayProxyResult } from 'aws-lambda';
import { CrudService } from '../crud/crud.service';
import { ReadEventInterface } from '../types/read-event.interface';

export default async (event: ReadEventInterface, context: Context): Promise<APIGatewayProxyResult> => {
  console.log('event', event);
  const crudService = new CrudService();
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
