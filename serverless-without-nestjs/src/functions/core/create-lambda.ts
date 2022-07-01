import { interfaces } from 'inversify';
import { appDiContainer } from '../../app/app.di-container';
import { LambdaInterface } from './interfaces';

export const createLambda = (Class: interfaces.Newable<LambdaInterface>) => {
  const handler = appDiContainer.resolve<LambdaInterface>(Class);
  return handler.execute.bind(handler);
}
