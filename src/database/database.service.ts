import * as sqlite3 from 'better-sqlite3';
import { injectable } from 'inversify';

@injectable()
export class DatabaseService {
  db: sqlite3.Database;

  async connect() {
    this.db = sqlite3(':memory:');
  }

  getDatabase(): sqlite3.Database {
    return this.db;
  }
}
