'use strict';

import { CrudService } from '../crud/crud.service';

export default async (event): any => {
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
