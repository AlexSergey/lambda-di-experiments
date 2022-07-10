import { databaseService as _databaseService } from './database/database.service';
import { connectorService as _connectorService } from './connector/connector.service';
import { createService as _createService } from './crud/create.service';
import { readService as _readService } from './crud/read.service';

import { readHandler } from './functions/read/read.handler';
import { createHandler } from './functions/create/create.handler';

const databaseService = _databaseService();
const connectorService = _connectorService(databaseService);
const createService = _createService(databaseService);
const readService = _readService(databaseService);

const read = readHandler(readService, connectorService);
const create = createHandler(createService, connectorService);

export { read, create }
