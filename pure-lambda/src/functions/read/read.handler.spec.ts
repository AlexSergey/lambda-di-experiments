import { databaseService as _databaseService } from '../../database/database.service';
import { connectorService as _connectorService } from '../../connector/connector.service';
import { crudService as _crudService } from '../../crud/crud.service';

import { readHandler } from './read.handler';

const databaseService = _databaseService();
const connectorService = _connectorService(databaseService);
const crudService = _crudService(databaseService);

const read = readHandler(crudService, connectorService);

describe('Read lambda test. Positive cases', () => {
  it('Read data. Get list of items', async () => {
    const result = await read();
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'list of items',
        })
    });
  });
});
