import { APIGatewayProxyResult, Callback, Context } from 'aws-lambda';

export interface LambdaInterface {
  execute(
    event?: unknown,
    context?: Context,
    callback?: Callback,
  ): Promise<APIGatewayProxyResult>;
}
