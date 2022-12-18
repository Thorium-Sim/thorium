import {ApolloProvider} from "@apollo/client";
import type {AppRouter} from "@server/newHelpers/router";
import {
  createLiveQueryReact,
  LiveQueryProvider,
} from "@thorium/live-query/client";
import {getTabId} from "@thorium/tab-id";
import {AlertDialog} from "@thorium/ui/AlertDialog";
import EasterEgg from "helpers/easter-egg";
import client from "helpers/graphqlClient";
import IntlProvider from "helpers/intl";
import {ReactNode} from "react";
import ToastContainer from "./ToastContext";

async function getRequestContext() {
  return {id: await getTabId()};
}
export function AppContext({children}: {children: ReactNode}) {
  return (
    <LiveQueryProvider getRequestContext={getRequestContext}>
      <ApolloProvider client={client}>
        <IntlProvider>
          <AlertDialog>{children}</AlertDialog>
          <ToastContainer />
          <EasterEgg />
        </IntlProvider>
      </ApolloProvider>
    </LiveQueryProvider>
  );
}

export const q = createLiveQueryReact<AppRouter>({
  headers: async () => ({
    "client-id": await getTabId(),
  }),
});
