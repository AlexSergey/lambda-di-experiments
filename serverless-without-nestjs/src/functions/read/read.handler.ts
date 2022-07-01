import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';
import { CrudService } from '../../crud/crud.service';
import { APP_DI_TYPES } from '../../app/app.di-types';
import { LambdaBaseClass, LambdaInterface } from '../core';

@injectable()
export class ReadHandler extends LambdaBaseClass implements LambdaInterface {
  constructor(
    @inject(APP_DI_TYPES.CrudService) private crudService: CrudService,
  ) {
    super();
  }

  async execute(): Promise<APIGatewayProxyResult> {
    return this.ok(await this.crudService.read());
  }
}
