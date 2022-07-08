import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  db: Record<string, string> = {};

  async connect() {
    this.db = {};
  }

  getDatabase(): Record<string, string> {
    return this.db;
  }
}
