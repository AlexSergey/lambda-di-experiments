import { ContainerModule, interfaces } from 'inversify';

import { APP_DI_TYPES } from './app.di-types';
import { CrudService } from '../crud/crud.service';
import { CreateHandler } from '../functions/create/create.handler';
import { ReadHandler } from '../functions/read/read.handler';
import { DatabaseService } from '../database/database.service';
import { ConnectorService } from '../connector/connector.service';

export const servicesBinding = new ContainerModule((bind: interfaces.Bind) => {
  bind<DatabaseService>(APP_DI_TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
  bind<ConnectorService>(APP_DI_TYPES.ConnectorService).to(ConnectorService).inSingletonScope();
  bind<CrudService>(APP_DI_TYPES.CrudService).to(CrudService).inSingletonScope();
});

export const handlersBinding = new ContainerModule((bind: interfaces.Bind) => {
  bind<ReadHandler>(APP_DI_TYPES.ReadHandler).to(ReadHandler);
  bind<CreateHandler>(APP_DI_TYPES.CreateHandler).to(CreateHandler);
});
