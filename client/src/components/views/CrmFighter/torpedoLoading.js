import React, { useReducer, useState, useEffect } from "react";
import { Button } from "reactstrap";
import { ReactComponent as Launcher } from "./launcher.svg";
import { ReactComponent as Torpedo } from "../TorpedoLoading/torpedos/torpedo.svg";
import uuid from "uuid";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

function reducer(state, action) {
  const { count } = action;
  if (count > state.length) {
    return state.concat(
      Array(count - state.length)
        .fill(0)
        .map(() => ({ id: uuid.v4() }))
    );
  }
  if (count < state.length) {
    return state.slice(state.length - count);
  }
  return state;
}
function LoadedTorpedo() {
  const [inBarrel, setInBarrel] = useState(false);
  useEffect(() => {
    if (!inBarrel) setInBarrel(true);
  }, [inBarrel]);
  return (
    <Torpedo
      className="torpedo-icon loaded"
      style={{ transform: `translate(${inBarrel ? 305 : 0}%, 0px)` }}
    />
  );
}

const TorpedoLoading = ({ id, clientId, torpedoCount, torpedoLoaded }) => {
  const [torpedos, dispatch] = useReducer(
    reducer,
    Array(torpedoCount - (torpedoLoaded ? 1 : 0))
      .fill(0)
      .map(() => ({ id: uuid.v4() }))
  );

  useEffect(() => {
    dispatch({ count: torpedoCount - (torpedoLoaded ? 1 : 0) });
  }, [torpedoCount, torpedoLoaded]);
  return (
    <div className="torpedo-loading">
      <div className="launcher-holder">
        <Launcher className="torpedo-launcher" />
        {torpedos.map((t, i) => (
          <Torpedo
            key={t.id}
            className="torpedo-icon"
            style={{ transform: `translate(0px, ${i * 100}%)` }}
          />
        ))}
        {torpedoLoaded && <LoadedTorpedo />}
      </div>
      <Mutation
        mutation={gql`
          mutation LoadTorpedo($id: ID!, $clientId: ID!) {
            crmLoadTorpedo(id: $id, clientId: $clientId)
          }
        `}
        variables={{ id, clientId }}
      >
        {action => (
          <Button
            className="load-button"
            color="danger"
            onClick={action}
            disabled={torpedoLoaded}
          >
            Load Torpedo
          </Button>
        )}
      </Mutation>
    </div>
  );
};
export default TorpedoLoading;
