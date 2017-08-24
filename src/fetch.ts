
interface Params {
  method: string;
  endpoint: string;
  sessionToken: boolean;
  query?: {
    [x: string]: string,
  };
  beforeFetch?: void;
  beforeSuccess?: void;
  success?: void;
  beforeError?: void;
  error?: void;
}

class Fetch{
  constructor(params: Params) {
  }
}
