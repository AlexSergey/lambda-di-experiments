import { Module } from '@nestjs/common';
import { CrudService } from '../crud/crud.service';

@Module({
  imports: [CrudService]
})
export class AppModule {}
