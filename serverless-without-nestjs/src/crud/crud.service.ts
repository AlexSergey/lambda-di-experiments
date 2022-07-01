import { injectable } from 'inversify';

@injectable()
export class CrudService {
  public read() {
    return 'list of webhooks here (without nestjs)';
  }
}
