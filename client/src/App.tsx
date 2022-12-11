import React from "react";
import Routes from "./containers/routes";
import {ErrorBoundary, FallbackProps} from "react-error-boundary";
import "./app.scss";
import "./fonts.scss";
import {AppContext} from "./context/AppContext";
import {LoadingSpinner} from "components/ui/LoadingSpinner";

const Fallback: React.FC<FallbackProps> = ({error}) => {
  return (
    <div className="p-4 text-white">
      <h1 className="text-5xl">Error</h1>
      <h2 className="text-3xl">{error?.message}</h2>
    </div>
  );
};

const App = () => (
  <React.Suspense fallback={<LoadingSpinner />}>
    <ErrorBoundary FallbackComponent={Fallback}>
      <AppContext>
        <Routes />
      </AppContext>
    </ErrorBoundary>
  </React.Suspense>
);

export default App;
