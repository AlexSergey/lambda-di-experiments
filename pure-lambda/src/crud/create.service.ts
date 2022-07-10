import { DatabaseServiceInterface } from '../database/database.service';
import { CreateData } from '../types/create-event.interface';

export type CreateServiceType = (data: CreateData) => Promise<boolean>;

export const createService = (databaseService: DatabaseServiceInterface): CreateServiceType => async (data: CreateData) => {
  if (typeof data === 'undefined') {
    throw new Error('Data is empty!');
  }
  console.log('saving...', data);
  return true;
}
