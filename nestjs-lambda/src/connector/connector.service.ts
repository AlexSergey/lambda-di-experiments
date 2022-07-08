import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

enum Statuses {
  connected = 'connected',
  disconnected = 'disconnected',
  failed = 'failed',
}

@Injectable()
export class ConnectorService {
  services = {
    databaseService: Statuses.disconnected,
  };

  constructor(private databaseService: DatabaseService) {}
  async connect() {
    if (this.services.databaseService === Statuses.connected) {
      return;
    } else {
      try {
        await this.databaseService.connect();
        this.services.databaseService = Statuses.connected;
      } catch (e) {
        this.services.databaseService = Statuses.failed;
        throw new Error('Database connection failed');
      }
    }
  }
}
