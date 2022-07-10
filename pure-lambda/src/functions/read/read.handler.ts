import { APIGatewayProxyResult } from 'aws-lambda';
import { ReadServiceType } from '../../crud/read.service';
import { ConnectorServiceInterface } from '../../connector/connector.service';
import { ok, fail } from '../../helpers/response';

export const readHandler = (readService: ReadServiceType, connectorService: ConnectorServiceInterface) => async (): Promise<APIGatewayProxyResult> => {
  try {
    await connectorService();
  } catch (e) {
    return fail(e.message);
  }
  return ok(await readService());
}
