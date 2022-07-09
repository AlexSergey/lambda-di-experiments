import { APIGatewayProxyResult } from 'aws-lambda';
import { CrudServiceInterface } from '../../crud/crud.service';
import { ConnectorServiceInterface } from '../../connector/connector.service';
import { ok, fail } from '../../helpers/response';

export const readHandler = (crudService: CrudServiceInterface, connectorService: ConnectorServiceInterface) => async (): Promise<APIGatewayProxyResult> => {
  try {
    await connectorService();
  } catch (e) {
    return fail(e.message);
  }
  return ok(await crudService.read());
}
