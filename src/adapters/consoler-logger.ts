// Adapters have no idea this is a react application
// All they care about is conforming to the interface AuthService

import { LoggerService } from "../services/logger";

export const ConsoleLogger: LoggerService = {
  init: () => Promise.resolve(),
  error: console.error,
  info: console.info,
  warn: console.warn,
};
