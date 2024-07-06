import { Mutation } from "@apollo/client";
import React, {useReducer, useState, useEffect} from "react";
import {Button} from "helpers/reactstrap";
import uuid from "uuid";
import gql from "graphql-tag.macro";
import {ReactComponent as TorpedoSVG} from "../TorpedoLoading/torpedos/torpedo.svg";

function reducer(state, action) {
  const {count} = action;
  if (count > state.length) {
    return state.concat(
      Array(count - state.length)
        .fill(0)
        .map(() => ({id: uuid.v4()})),
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
    <TorpedoSVG
      alt="torpedo"
      className="torpedo-icon loaded"
      style={{transform: `translate(${inBarrel ? 305 : 0}%, 0px)`}}
    />
  );
}

const TorpedoLoading = ({id, clientId, torpedoCount, torpedoLoaded}) => {
  let torpCount = torpedoCount - (torpedoLoaded ? 1 : 0);
  if (torpCount < 0) torpCount = 0;
  const [torpedos, dispatch] = useReducer(
    reducer,
    Array(torpCount)
      .fill(0)
      .map(() => ({id: uuid.v4()})),
  );

  useEffect(() => {
    dispatch({count: torpedoCount - (torpedoLoaded ? 1 : 0)});
  }, [torpedoCount, torpedoLoaded]);
  return (
    <div className="torpedo-loading">
      <div className="launcher-holder">
        <img
          alt="torpedo launcher"
          src={require("./launcher.svg")}
          className="torpedo-launcher"
        />
        {torpedos.map((t, i) => (
          <TorpedoSVG
            alt="torpedo"
            key={t.id}
            className="torpedo-icon"
            style={{transform: `translate(0px, ${i * 100}%)`}}
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
        variables={{id, clientId}}
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
