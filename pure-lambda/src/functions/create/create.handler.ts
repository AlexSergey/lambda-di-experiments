import { APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreateServiceType } from '../../crud/create.service';
import { ConnectorServiceInterface } from '../../connector/connector.service';
import { CreateEventInterface } from '../../types/create-event.interface';
import { CreateDto } from './dto/create.dto';
import { ok, fail } from '../../helpers/response';
import { bodyParser } from '../../helpers/request';

export const createHandler = (createService: CreateServiceType, connectorService: ConnectorServiceInterface) => async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
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
    await createService(body.data);
    return ok('saved');
  } catch (e) {
    return fail(e.message);
  }
}
