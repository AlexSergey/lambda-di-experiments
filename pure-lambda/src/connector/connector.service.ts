import { DatabaseServiceInterface } from '../database/database.service';

enum Statuses {
  connected = 'connected',
  disconnected = 'disconnected',
  failed = 'failed',
}

const services = {
  databaseService: Statuses.disconnected
};

export type ConnectorServiceInterface = () => Promise<void>;

export const connectorService = (databaseService: DatabaseServiceInterface) => async () => {
  if (services.databaseService === Statuses.connected) {
    return;
  } else {
    try {
      await databaseService.connect();
      services.databaseService = Statuses.connected;
    } catch (e) {
      services.databaseService = Statuses.failed;
      throw new Error('Database connection failed');
    }
  }
}
