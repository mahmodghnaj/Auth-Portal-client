import { ReactElement, useState } from "react";
import {
  Hydrate,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import NewContractProvider from "./NewContractContext";

interface ProviderProps {
  children: ReactElement;
  pageProps: any;
}

let error = "";
let listeners: any = [];

const errorFn = () => {
  const setError = (e: string | any) => {
    error = e;
    emitChange();
  };
  const subscribe = (listener: Function) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l: Function) => l !== listener);
    };
  };
  function emitChange() {
    for (let listener of listeners) {
      listener();
    }
  }
  const getError = () => {
    if (error !== "") {
      return error;
    }
  };
  return { setError, getError, subscribe };
};
export const { setError, getError, subscribe } = errorFn();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error: Error | unknown) => {
      if (error instanceof Error) setError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof Error) {
        setError(error);
      }
    },
  }),
});

export const Provider = ({ children, pageProps }: ProviderProps) => {
  const [queryClientState] = useState(queryClient);
  return (
    <>
      <QueryClientProvider client={queryClientState}>
        <NewContractProvider>
          <Hydrate state={pageProps.dehydratedState}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </Hydrate>
        </NewContractProvider>
      </QueryClientProvider>
    </>
  );
};

export default Provider;
