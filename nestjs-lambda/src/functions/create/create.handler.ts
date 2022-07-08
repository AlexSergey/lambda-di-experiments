import { Injectable } from '@nestjs/common';
import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { CrudService } from '../../crud/crud.service';
import { LambdaBaseClass } from '../core/lambda-base.class';
import { LambdaInterface } from '../core/interfaces';
import { CreateDto } from './dto/create.dto';
import { ConnectorService } from '../../connector/connector.service';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreateEventInterface } from '../../types/create-event.interface';

@Injectable()
export class CreateHandler extends LambdaBaseClass implements LambdaInterface {
  constructor(
    private crudService: CrudService,
    private connectorService: ConnectorService,
  ) {
    super();
  }

  async execute(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    const dto: CreateDto = plainToInstance(CreateDto, event.body);

    try {
      await validateOrReject(dto);
    } catch (errors) {
      if (Array.isArray(errors)) {
        const errorsData = errors.reduce((src, { constraints, property }) => {
          src[property] = Object.values(constraints).join(', ');
          return src;
        }, {});
        return this.fail(errorsData);
      }
    }
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
