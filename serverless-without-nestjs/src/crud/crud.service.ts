import { injectable } from 'inversify';
import { CreateData } from '../types/create-event.interface';

@injectable()
export class CrudService {
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
