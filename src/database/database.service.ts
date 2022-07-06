import { injectable } from 'inversify';

@injectable()
export class DatabaseService {
  db: {};

  async connect() {
    this.db = {};
  }

  getDatabase(): {} {
    return this.db;
  }
}
