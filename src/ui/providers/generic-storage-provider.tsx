// This file connects a StorageService object with
// the React context our application is going to use
// It doesn't matter where the service is coming from (firebase, fake, aws, etc)

import { StorageErrors, StorageService, WithID } from "../../services/storage";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";

// This is what our React components/hooks will consume
type StorageContext<T extends WithID> = Pick<
  StorageService<T>,
  "findAll" | "findById" | "remove" | "save" | "create"
>;

interface ProviderParams<T extends WithID> {
  storageService: StorageService<T>;
}

export const makeStorageProvider = <T extends WithID>(name: string) => {
  // We need to set up a default context
  const ReactStorageContext = createContext<StorageContext<T> | null>(null);
  ReactStorageContext.displayName = name;

  const ContextProvider = ({
    storageService,
    children,
  }: PropsWithChildren<ProviderParams<T>>) => {
    useEffect(() => {
      storageService.open().catch(() => {
        throw Error(StorageErrors.FailedToOpenConnection);
      });
      return () => {
        storageService.close();
      };
    }, [storageService]);

    return (
      <ReactStorageContext.Provider value={storageService}>
        {children}
      </ReactStorageContext.Provider>
    );
  };

  const useStorage = () => {
    const ctx = useContext(ReactStorageContext);

    if (ctx === null) {
      throw Error(StorageErrors.ServiceNotSetUp);
    }

    return ctx;
  };

  return { ContextProvider, useStorage };
};
