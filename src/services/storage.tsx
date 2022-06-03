// This file connects a StorageService object with
// the React context our application is going to use
// It doesn't matter where the service is coming from (firebase, fake, aws, etc)
export type WithID = {
  id: string;
};

// This is what external adapters have to implement
// Make sure this interface will fulfill all the needs of the application
export interface StorageService<T extends WithID> {
  open: () => Promise<void>;
  close: () => Promise<void>;
  findById: (id: string) => Promise<T>;
  findAll: () => Promise<T[]>;
  create: (data: Omit<T, "id">) => Promise<T>;
  save: (data: T) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

export const StorageErrors = {
  ServiceNotSetUp: "Storage Service has not been set up",
  FailedToOpenConnection: "Could not open connection to storage service",
};
