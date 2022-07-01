import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';
import { CrudService } from '../crud/crud.service';
import { ReadEventInterface } from '../types/read-event.interface';
import { APP_DI_TYPES } from '../app/app.di-types';
import { LambdaBaseClass, LambdaInterface } from './core';

@injectable()
export class ReadHandler extends LambdaBaseClass implements LambdaInterface {
  constructor(
    @inject(APP_DI_TYPES.CrudService) private crudService: CrudService,
  ) {
    super();
  }

  async execute(event: ReadEventInterface): Promise<APIGatewayProxyResult> {
    console.log('event', event);
    return this.ok(this.crudService.read());
  }
}
