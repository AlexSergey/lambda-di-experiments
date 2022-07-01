import { ContainerModule, interfaces } from 'inversify';

import { APP_DI_TYPES } from './app.di-types';
import { CrudService } from '../crud/crud.service';
import { ReadHandler } from '../functions/read.handler';

export const servicesBinding = new ContainerModule((bind: interfaces.Bind) => {
  bind<CrudService>(APP_DI_TYPES.CrudService).to(CrudService).inSingletonScope();
});

export const handlersBinding = new ContainerModule((bind: interfaces.Bind) => {
  bind<ReadHandler>(APP_DI_TYPES.ReadHandler).to(ReadHandler).inSingletonScope();
});
