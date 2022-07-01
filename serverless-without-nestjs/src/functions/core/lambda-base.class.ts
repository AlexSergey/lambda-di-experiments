import { injectable } from 'inversify';

@injectable()
export class LambdaBaseClass {
  stringify<T>(data: T) {
    return JSON.stringify(
      {
        message: data,
      },
      null,
      2
    )
  }

  ok<T>(data: T) {
    return {
      statusCode: 200,
      body: this.stringify<T>(data),
    }
  }
}
