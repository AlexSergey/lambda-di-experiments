import { injectable, inject } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';
import { CrudService } from '../../crud/crud.service';
import { APP_DI_TYPES } from '../../app/app.di-types';
import { LambdaBaseClass } from '../core/lambda-base.class';
import { LambdaInterface } from '../core/interfaces';
import { ConnectorService } from '../../connector/connector.service';

@injectable()
export class ReadHandler extends LambdaBaseClass implements LambdaInterface {
  constructor(
    @inject(APP_DI_TYPES.CrudService) private crudService: CrudService,
    @inject(APP_DI_TYPES.ConnectorService) private connectorService: ConnectorService,
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
