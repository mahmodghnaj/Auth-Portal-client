import { type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import QueryClientProvider from "@/providers/QueryClientProvider";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Page = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const PageComponentWithLayout = () => getLayout(<Component {...pageProps} />);
  return (
    <>
      <QueryClientProvider pageProps={pageProps}>
        <PageComponentWithLayout />
      </QueryClientProvider>
    </>
  );
};
export default Page;
