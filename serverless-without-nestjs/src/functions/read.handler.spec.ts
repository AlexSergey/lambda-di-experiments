import { appDiContainer } from '../app/app.di-container';
import { servicesBinding } from '../app/app.di-binding';
import { ContainerModule, injectable, interfaces } from 'inversify';
import { CrudService } from '../crud/crud.service';
import { APP_DI_TYPES } from '../app/app.di-types';
import { createLambda } from './core';
import { ReadHandler } from './read.handler';

describe('Lambda test', () => {
  beforeAll(() => {
    appDiContainer.unload(servicesBinding);

    @injectable()
    class CrudService2 {
      read() {
        return 'hi there';
      }
    }

    appDiContainer.load((
      new ContainerModule((bind: interfaces.Bind) => {
        bind<CrudService>(APP_DI_TYPES.CrudService).to(CrudService2).inSingletonScope();
      })
    ));
  });

  it('Read', async () => {
    const read = createLambda(ReadHandler);
    const result = await read();
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'hi there',
        },
        null,
        2
      )
    });
  });
});
