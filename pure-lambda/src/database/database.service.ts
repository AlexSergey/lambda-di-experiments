export interface DatabaseServiceInterface {
  connect(): Promise<void>
  getDatabase(): Record<string, string>
}

export const databaseService = (() => {
  let db: Record<string, string>;

  return (): DatabaseServiceInterface => ({
    async connect() {
      db = {};
    },

    getDatabase(): Record<string, string> {
      return db;
    }
  })
})();
