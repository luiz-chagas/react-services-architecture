// This file connects a LoggerService instance with
// the React context our application is going to use

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  PropsWithChildren,
} from "react";
import { LoggerErrors, LoggerService } from "../../services/logger";

// This is what React components/hooks will consume
type LoggerServiceContext = Omit<LoggerService, "init">;

// Create the context
const LoggerContext = createContext<LoggerServiceContext | null>(null);

interface ProviderParams {
  loggerService: LoggerService;
}

export const LoggerContextProvider = ({
  loggerService,
  children,
}: PropsWithChildren<ProviderParams>) => {
  useEffect(() => {
    loggerService.init().catch(() => {
      throw Error(LoggerErrors.FailedToOpenConnection);
    });
  }, [loggerService]);

  const value: LoggerServiceContext = useMemo(
    () => ({
      error: loggerService.error,
      info: loggerService.info,
      warn: loggerService.warn,
    }),
    [loggerService.error, loggerService.info, loggerService.warn]
  );

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
};

export const useLogger = () => {
  const ctx = useContext(LoggerContext);
  if (ctx === null) {
    throw Error(LoggerErrors.ServiceNotSetUp);
  }

  return ctx;
};
