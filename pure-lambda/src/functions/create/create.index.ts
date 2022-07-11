import { databaseService as _databaseService } from '../../database/database.service';
import { connectorService as _connectorService } from '../../connector/connector.service';
import { createService as _createService } from '../../crud/create.service';

import { createHandler } from './create.handler';

const databaseService = _databaseService();
const connectorService = _connectorService(databaseService);
const createService = _createService(databaseService);

const create = createHandler(createService, connectorService);

export default create;
