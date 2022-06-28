// This is what external adapters have to implement
// Make sure this interface will fulfill all the needs of the application
export interface LoggerService {
  init: () => Promise<void>;
  error: (err: Error | string) => void;
  warn: (message: string) => void;
  info: (message: string) => void;
}

export const LoggerErrors = {
  ServiceNotSetUp: "Logging Service has not been set up",
  FailedToOpenConnection: "Could not open connection to logging service",
};
