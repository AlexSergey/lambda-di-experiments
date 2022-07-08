import { inject, injectable } from 'inversify';
import { APP_DI_TYPES } from '../app/app.di-types';
import { DatabaseService } from '../database/database.service';

enum Statuses {
  connected = 'connected',
  disconnected = 'disconnected',
  failed = 'failed',
}

@injectable()
export class ConnectorService {
  services = {
    databaseService: Statuses.disconnected
  }
  constructor(@inject(APP_DI_TYPES.DatabaseService) private databaseService: DatabaseService) {
  }
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
