import { APIGatewayProxyResult, Callback, Context } from 'aws-lambda';

export interface LambdaInterface {
  initialize?(): Promise<void>;
  execute(event?: unknown, context?: Context, callback?: Callback): Promise<APIGatewayProxyResult>
}
