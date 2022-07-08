import { CrudService } from '../../crud/crud.service';
import { CreateHandler } from './create.handler';
import * as createData from '../../../../invoke/create.json';
import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app/app.module';

describe('Create lambda test. Positive cases', () => {
  let service: CreateHandler;

  @Injectable()
  class MockSuccessCrud extends CrudService {
    override async create() {
      return true;
    }
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CrudService)
      .useClass(MockSuccessCrud)
      .compile();

    service = module.get<CreateHandler>(CreateHandler);
  });

  it('Create data. Get 200 ok result with saved message', async () => {
    const create = service.execute.bind(service);
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
  let service: CreateHandler;

  @Injectable()
  class MockFailCrud extends CrudService {
    override async create() {
      throw new Error('Something went wrong');
      return false;
    }
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CrudService)
      .useClass(MockFailCrud)
      .compile();

    service = module.get<CreateHandler>(CreateHandler);
  });

  describe('Create lambda test. Save errors', () => {
    it('Create data. Get 400 error', async () => {
      const create = service.execute.bind(service);
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
      const create = service.execute.bind(service);
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
