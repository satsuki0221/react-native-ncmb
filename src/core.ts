abstract class Core {
  query: { key: string };
  constructor(query: { key: string }) {
    this.query = query;
  }

  abstract method: string;
  abstract endpoint: string;

  beforeFetch() { void 0; }
  beforeSuccess() { void 0; }
  beforeError() { void 0; }
}
