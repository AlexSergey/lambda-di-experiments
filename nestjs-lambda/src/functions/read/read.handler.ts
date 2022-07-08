import { Injectable } from '@nestjs/common';
import { APIGatewayProxyResult } from 'aws-lambda';
import { CrudService } from '../../crud/crud.service';
import { LambdaBaseClass } from '../core/lambda-base.class';
import { LambdaInterface } from '../core/interfaces';
import { ConnectorService } from '../../connector/connector.service';

@Injectable()
export class ReadHandler extends LambdaBaseClass implements LambdaInterface {
  constructor(
    private crudService: CrudService,
    private connectorService: ConnectorService,
  ) {
    super();
  }

  async execute(): Promise<APIGatewayProxyResult> {
    try {
      await this.connectorService.connect();
    } catch (e) {
      return this.fail(e.message);
    }
    return this.ok(await this.crudService.read());
  }
}
