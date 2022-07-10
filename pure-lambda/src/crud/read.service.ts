import { DatabaseServiceInterface } from '../database/database.service';

export type ReadServiceType = () => Promise<string>;

export const readService = (databaseService: DatabaseServiceInterface): ReadServiceType => async () => {
  return 'list of items';
}
