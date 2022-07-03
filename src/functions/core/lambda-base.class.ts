import { injectable } from 'inversify';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

@injectable()
export class LambdaBaseClass {
  stringify<T>(data: T): string {
    return JSON.stringify(
      {
        message: typeof data !== 'undefined' ? data : '',
      })
  }

  bodyParser<T>(event: APIGatewayEvent): T {
    return typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
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
