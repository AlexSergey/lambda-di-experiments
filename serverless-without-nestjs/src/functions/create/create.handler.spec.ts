import { appDiContainer } from '../../app/app.di-container';
import { servicesBinding } from '../../app/app.di-binding';
import { ContainerModule, injectable, interfaces } from 'inversify';
import { CrudService } from '../../crud/crud.service';
import { APP_DI_TYPES } from '../../app/app.di-types';
import { createLambda } from '../core';
import { CreateHandler } from './create.handler';
import * as createData from '../../../../invoke-data/create.json';
import { CreateData } from '../../types/create-event.interface';

describe('Create lambda test. Positive cases', () => {
  @injectable()
  class MockSuccessCrud extends CrudService {
    override async create(data: CreateData) {
      return true;
    }
  }

  const mockedService = new ContainerModule((bind: interfaces.Bind) => {
    bind<MockSuccessCrud>(APP_DI_TYPES.CrudService).to(MockSuccessCrud).inSingletonScope();
  });

  beforeAll(() => {
    appDiContainer.unload(servicesBinding);
    appDiContainer.load(mockedService);
  });

  afterAll(() => {
    appDiContainer.unload(mockedService);
    appDiContainer.load(servicesBinding);
  });

  it('Create data. Get 200 ok result with saved message', async () => {
    const create = createLambda(CreateHandler, appDiContainer);
    const result = await create(createData);
    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'saved',
        })
    });
  });
});

describe('Create lambda test. Negative cases', () => {
  describe('Create lambda test. Save errors', () => {
    @injectable()
    class MockFailCrud extends CrudService {
      override async create(data: CreateData) {
        throw new Error('Something went wrong');
        return false;
      }
    }

    const mockedService = new ContainerModule((bind: interfaces.Bind) => {
      bind<MockFailCrud>(APP_DI_TYPES.CrudService).to(MockFailCrud).inSingletonScope();
    });

    beforeAll(() => {
      appDiContainer.unload(servicesBinding);
      appDiContainer.load(mockedService);
    });

    afterAll(() => {
      appDiContainer.unload(mockedService);
      appDiContainer.load(servicesBinding);
    });

    it('Create data. Get 400 error', async () => {
      const create = createLambda(CreateHandler, appDiContainer);
      const result = await create(createData);
      expect(result).toEqual({
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'Something went wrong',
          })
      });
    });
  });

  describe('Create lambda test. Validation errors', () => {
    it('Create data. Get validation error', async () => {
      const create = createLambda(CreateHandler, appDiContainer);
      const dataWithoutType = {...createData};
      delete dataWithoutType.type;
      const result = await create(dataWithoutType);
      expect(result).toEqual({
        statusCode: 400,
        body: JSON.stringify(
          {
            message: {
              type: 'Type should be a string'
            },
          })
      });
    });
  });
});
