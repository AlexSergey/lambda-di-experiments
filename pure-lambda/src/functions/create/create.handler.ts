/*
import { inject, injectable } from 'inversify';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { CrudService } from '../../crud/crud.service';
import { CreateEventInterface } from '../../types/create-event.interface';
import { APP_DI_TYPES } from '../../app/app.di-types';
import { LambdaBaseClass } from '../core/lambda-base.class';
import { LambdaInterface } from '../core/interfaces';
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
*/
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CrudServiceInterface } from '../../crud/crud.service';
import { ConnectorServiceInterface } from '../../connector/connector.service';
import { CreateEventInterface } from '../../types/create-event.interface';
import { CreateDto } from './dto/create.dto';
import { ok, fail } from '../../helpers/response';
import { bodyParser } from '../../helpers/request';

export const createHandler = (crudService: CrudServiceInterface, connectorService: ConnectorServiceInterface) => async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectorService();
  } catch (e) {
    return fail(e.message);
  }

  const body = bodyParser<CreateEventInterface>(event);

  const dto: CreateDto = plainToInstance(CreateDto, body);

  try {
    await validateOrReject(dto);
  } catch (errors) {
    if (Array.isArray(errors)) {
      const errorsData = errors.reduce((src, { constraints, property }) => {
        src[property] = Object.values(constraints).join(', ');
        return src;
      }, {});
      return fail(errorsData);
    }
  }

  try {
    await crudService.create(body.data);
    return ok('saved');
  } catch (e) {
    return fail(e.message);
  }
}
