import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateData } from '../types/create-event.interface';

@Injectable()
export class CrudService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: CreateData) {
    if (typeof data === 'undefined') {
      throw new Error('Data is empty!');
    }
    console.log('saving...', data);
    return true;
  }

  async read() {
    return 'list of items';
  }
}
