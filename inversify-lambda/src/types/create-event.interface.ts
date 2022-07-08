interface Authentication {
  type: string;
  auth: string;
}

export interface CreateData {
  keys: string;
}

export interface CreateEventInterface {
  type: string;
  applicationName: string;
  description: string;
  url: string;
  authentication: Authentication;
  data: CreateData;
}
