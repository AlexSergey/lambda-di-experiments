import { APIGatewayEvent } from 'aws-lambda';

export const bodyParser = <T>(event: APIGatewayEvent): T => {
  return typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
}
