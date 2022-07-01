import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';
import { CrudService } from '../../crud/crud.service';
import { CreateEventInterface } from '../../types/create-event.interface';
import { APP_DI_TYPES } from '../../app/app.di-types';
import { LambdaBaseClass, LambdaInterface } from '../core';
import { CreateDto } from './dto/create.dto';
import { validation } from '../../decorators/validation.decorator';

@injectable()
export class CreateHandler extends LambdaBaseClass implements LambdaInterface {
  constructor(
    @inject(APP_DI_TYPES.CrudService) private crudService: CrudService,
  ) {
    super();
  }

  @validation(CreateDto)
  async execute(event: CreateEventInterface): Promise<APIGatewayProxyResult> {
    try {
      await this.crudService.create(event.data);
      return this.ok('saved');
    } catch (e) {
      return this.fail(e.message);
    }
  }
}
