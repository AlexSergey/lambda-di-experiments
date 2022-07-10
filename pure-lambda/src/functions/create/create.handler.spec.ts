import { databaseService as _databaseService } from '../../database/database.service';
import { connectorService as _connectorService } from '../../connector/connector.service';
import { CreateServiceType } from '../../crud/create.service';

import { createHandler } from './create.handler';
import { CreateData } from '../../types/create-event.interface';

import * as createData from '../../../../invoke/create.json';

const databaseService = _databaseService();
const connectorService = _connectorService(databaseService);

describe('Create lambda test. Positive cases', () => {
  let create;
  beforeAll(() => {
    const createService: CreateServiceType = async () => {
      return true;
    };

    create = createHandler(createService, connectorService);
  })

  it('Create data. Get 200 ok result with saved message', async () => {
    const result = await create(createData);
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: 'saved',
      }),
    });
  });
});

describe('Create lambda test. Negative cases', () => {
  let create;
  beforeAll(() => {
    const createService: CreateServiceType = async () => {
      throw new Error('Something went wrong');
      return false;
    };

    create = createHandler(createService, connectorService);
  });

  describe('Create lambda test. Save errors', () => {
    it('Create data. Get 400 error', async () => {
      const result = await create(createData);
      expect(result).toEqual({
        statusCode: 400,
        body: JSON.stringify({
          message: 'Something went wrong',
        }),
      });
    });
  });

  describe('Create lambda test. Validation errors', () => {
    it('Create data. Get validation error', async () => {
      const dataWithoutType = { ...createData };
      delete dataWithoutType.body.type;
      const result = await create(dataWithoutType);
      expect(result).toEqual({
        statusCode: 400,
        body: JSON.stringify({
          message: {
            type: 'Type should be a string',
          },
        }),
      });
    });
  });
});
