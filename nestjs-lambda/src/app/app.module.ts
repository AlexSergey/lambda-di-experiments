import { Module } from '@nestjs/common';

import { ConnectorService } from '../connector/connector.service';
import { DatabaseService } from '../database/database.service';
import { CrudService } from '../crud/crud.service';

import { ReadHandler } from '../functions/read/read.handler';
import { CreateHandler } from '../functions/create/create.handler';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ConnectorService,
    DatabaseService,
    CrudService,
    ReadHandler,
    CreateHandler,
  ],
})
export class AppModule {}
