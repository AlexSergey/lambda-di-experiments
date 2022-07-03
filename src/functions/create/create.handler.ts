import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { CrudService } from '../../crud/crud.service';
import { CreateEventInterface } from '../../types/create-event.interface';
import { APP_DI_TYPES } from '../../app/app.di-types';
import { LambdaBaseClass, LambdaInterface } from '../core';
import { CreateDto } from './dto/create.dto';
import { validation } from '../../decorators/validation.decorator';
import { ConnectorService } from '../../connector/connector.service';

@injectable()
export class CreateHandler extends LambdaBaseClass implements LambdaInterface {
  constructor(
    @inject(APP_DI_TYPES.CrudService) private crudService: CrudService,
    @inject(APP_DI_TYPES.ConnectorService) private connectorService: ConnectorService,
  ) {
    super();
  }

  @validation(CreateDto)
  async execute(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    try {
      await this.connectorService.connect();
    } catch (e) {
      return this.fail(e.message);
    }
    const body = this.bodyParser<CreateEventInterface>(event);
    try {
      await this.crudService.create(body.data);
      return this.ok('saved');
    } catch (e) {
      return this.fail(e.message);
    }
  }
}
