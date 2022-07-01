import { injectable } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';

@injectable()
export class LambdaBaseClass {
  stringify<T>(data: T): string {
    return JSON.stringify(
      {
        message: typeof data !== 'undefined' ? data : '',
      })
  }

  ok<T>(data?: T): APIGatewayProxyResult {
    return {
      statusCode: 200,
      body: this.stringify<T>(data)
    }
  }

  fail(errorMessage?: string, code = 400): APIGatewayProxyResult {
    return {
      statusCode: code,
      body: this.stringify(errorMessage)
    }
  }
}
