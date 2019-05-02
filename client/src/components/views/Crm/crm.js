import React from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { FormattedMessage } from "react-intl";
import Tour from "helpers/tourHelper";

function reducer(state, action = {}) {
  if (action.type === "toggle") {
    return { ...state, [action.station]: !state[action.station] };
  }
  if (action.type === "replace") {
    return action.state;
  }
  return state;
}

const trainingSteps = [
  {
    selector: ".blank",
    content: (
      <FormattedMessage
        id="crm-training-1"
        defaultMessage="The CRM is an automated fighter system that can be controlled by any of the stations on the bridge. This screen allows you to activate the CRM system on those stations."
      />
    )
  },
  {
    selector: ".station-list",
    content: (
      <FormattedMessage
        id="crm-training-2"
        defaultMessage="To choose the stations you want to activate the CRM on, click on the name of the station in this list to toggle it on or off."
      />
    )
  },
  {
    selector: ".select-all-stations",
    content: (
      <FormattedMessage
        id="crm-training-3"
        defaultMessage="Click this button to select all of the stations."
      />
    )
  },
  {
    selector: ".activate-crm",
    content: (
      <FormattedMessage
        id="crm-training-4"
        defaultMessage="Click this button to activate the CRM on the selected stations."
      />
    )
  }
];
const Crm = props => {
  const [state, dispatch] = React.useReducer(reducer, {});

  function selectAll() {
    const newState = props.simulator.stations.reduce((acc, station) => {
      return { ...acc, [station.name]: true };
    }, {});
    dispatch({ type: "replace", state: newState });
  }
  return (
    <div className="card-crm">
      <div className="ship-image">
        <img
          draggable="false"
          src={`/assets${props.simulator.assets.top}`}
          alt="Simulator"
        />
      </div>
      <div className="station-list">
        <ListGroup>
          {props.simulator.stations.map(station => (
            <ListGroupItem
              key={station.name}
              active={state[station.name]}
              onClick={() =>
                dispatch({ type: "toggle", station: station.name })
              }
            >
              {station.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div className="reset-password">
        <Button color="info" block>
          <FormattedMessage
            id="crm-reset-password"
            defaultMessage="Reset Password"
          />
        </Button>
      </div>
      <div className="activate-crm">
        <Mutation
          mutation={gql`
            mutation SetCRMActiavted($id: ID!, $state: Boolean!) {
              crmSetActivated(id: $id, state: $state)
            }
          `}
          variables={{
            id: props.id,
            state: !props.activated
          }}
        >
          {action => (
            <Button color="danger" size="lg" block onClick={action}>
              {props.activated ? (
                <FormattedMessage
                  id="crm-deactivate"
                  defaultMessage="Deactivate"
                />
              ) : (
                <FormattedMessage id="crm-activate" defaultMessage="Activate" />
              )}
            </Button>
          )}
        </Mutation>
      </div>
      <div className="select-all-stations">
        <Button color="info" block onClick={selectAll}>
          <FormattedMessage id="crm-select-all" defaultMessage="Select All" />
        </Button>
      </div>
      <div className="power-control" />
      <Tour steps={trainingSteps} client={props.clientObj} />
    </div>
  );
};
export default Crm;
