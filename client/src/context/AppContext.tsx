import {ApolloProvider} from "@apollo/client";
import {AlertDialog} from "@thorium/ui/AlertDialog";
import EasterEgg from "helpers/easter-egg";
import client from "helpers/graphqlClient";
import IntlProvider from "helpers/intl";
import {ReactNode} from "react";
import {ThoriumProvider} from "./ThoriumContext";
import ToastContainer from "./ToastContext";

export function AppContext({children}: {children: ReactNode}) {
  return (
    <ThoriumProvider>
      <ApolloProvider client={client}>
        <IntlProvider>
          <AlertDialog>{children}</AlertDialog>
          <ToastContainer />
          <EasterEgg />
        </IntlProvider>
      </ApolloProvider>
    </ThoriumProvider>
  );
}
