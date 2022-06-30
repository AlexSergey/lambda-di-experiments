import { Injectable } from '@nestjs/common';

@Injectable()
export class CrudService {
  public read() {
    return 'list of webhooks here (with nestjs)';
  }

  public list() {
    return 'list';
  }
}
