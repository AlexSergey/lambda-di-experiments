import { databaseService as _databaseService } from '../../database/database.service';
import { connectorService as _connectorService } from '../../connector/connector.service';
import { readService as _readService } from '../../crud/read.service';

import { readHandler } from './read.handler';

const databaseService = _databaseService();
const connectorService = _connectorService(databaseService);
const readService = _readService(databaseService);

const read = readHandler(readService, connectorService);

export default read;
