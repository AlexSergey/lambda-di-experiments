import { ReadEventInterface } from '../../types/read-event.interface';
import { APIGatewayProxyResult, Callback, Context } from 'aws-lambda';

export interface LambdaInterface {
  execute(event: ReadEventInterface, context?: Context, callback?: Callback): Promise<APIGatewayProxyResult>
}
