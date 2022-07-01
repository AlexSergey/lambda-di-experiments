import { Container, interfaces } from 'inversify';
import { LambdaInterface } from './interfaces';

export const createLambda = (Class: interfaces.Newable<LambdaInterface>, container: Container) => {
  const handler = container.resolve<LambdaInterface>(Class);
  return handler.execute.bind(handler);
}
