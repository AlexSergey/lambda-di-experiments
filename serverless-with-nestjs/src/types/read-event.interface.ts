interface Authentication {
  type: string;
  auth: string;
}

interface Data {
  keys: string;
}

export interface ReadEventInterface {
  type: string;
  applicationName: string;
  description: string;
  url: string;
  authentication: Authentication;
  data: Data;
}
