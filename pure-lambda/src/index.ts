import { databaseService as _databaseService } from './database/database.service';
import { connectorService as _connectorService } from './connector/connector.service';
import { crudService as _crudService } from './crud/crud.service';

import { readHandler } from './functions/read/read.handler';
import { createHandler } from './functions/create/create.handler';

const databaseService = _databaseService();
const connectorService = _connectorService(databaseService);
const crudService = _crudService(databaseService);

const read = readHandler(crudService, connectorService);
const create = createHandler(crudService, connectorService);

export { read, create }
