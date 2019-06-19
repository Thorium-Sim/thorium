import React from "react";
import { Button, ListGroup, ListGroupItem /*Input*/ } from "helpers/reactstrap";
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

const trainingSteps = name => [
  {
    selector: ".blank",
    content: (
      <FormattedMessage
        id="crm-training-1"
        defaultMessage="The {name} is an automated fighter system that can be controlled by any of the stations on the bridge. This screen allows you to activate the {name} system on those stations."
        values={{ name }}
      />
    )
  },
  {
    selector: ".station-list",
    content: (
      <FormattedMessage
        id="crm-training-2"
        defaultMessage="To choose the stations you want to activate the {name} on, click on the name of the station in this list to toggle it on or off."
        values={{ name }}
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
        defaultMessage="Click this button to activate the {name} on the selected stations. This button is disabled during training mode to keep the {name} from disturbing other station training."
        values={{ name }}
      />
    )
  }
];
const Crm = props => {
  const [state, dispatch] = React.useReducer(reducer, {});
  // const [updatePassword, setUpdatePassword] = React.useState(false);
  // const [password, setPassword] = React.useState(props.password);
  function selectAll() {
    const newState = props.simulator.stations.reduce((acc, station) => {
      return { ...acc, [station.name]: true };
    }, {});
    dispatch({ type: "replace", state: newState });
  }
  const activatedStations = props.clients.reduce((acc, client) => {
    if (!client.station) return acc;
    acc[client.station.name] =
      acc[client.station.name] || client.hypercard === "CrmFighter";
    return acc;
  }, {});
  const [actCount, deacCount] = Object.entries(state).reduce(
    (acc, [name, selected]) => {
      if (!selected) return acc;
      if (activatedStations[name]) acc[0] += 1;
      else acc[1] += 1;
      return acc;
    },
    [0, 0]
  );
  const activated = actCount >= deacCount;
  const triggerHypercard = action => () => {
    const stations = Object.entries(state)
      .filter(([name, active]) => active)
      .map(([name]) => name);
    const stationClients = props.clients
      .filter(c => c.station && stations.includes(c.station.name))
      .map(c => c.id);
    stationClients.forEach(clientId =>
      action({ variables: { clientId, comp: activated ? null : "CrmFighter" } })
    );
  };
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
              className={activatedStations[station.name] ? "text-danger" : ""}
              onClick={() =>
                dispatch({ type: "toggle", station: station.name })
              }
            >
              {station.name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      {/*       
      <div className="reset-password">
        {updatePassword ? (
          <>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Mutation
              mutation={gql`
                mutation UpdatePassword($id: ID!, $password: String!) {
                  crmSetPassword(id: $id, password: $password)
                }
              `}
              variables={{ id: props.id, password }}
            >
              {action => (
                <Button
                  color="warning"
                  disabled={!password}
                  onClick={() => {
                    setUpdatePassword(false);
                    action();
                  }}
                >
                  <FormattedMessage
                    id="crm-confirm-reset-password"
                    defaultMessage="Confirm Password"
                  />
                </Button>
              )}
            </Mutation>
          </>
        ) : (
          <Button color="info" block onClick={() => setUpdatePassword(true)}>
            <FormattedMessage
              id="crm-reset-password"
              defaultMessage="Reset Password"
            />
          </Button>
        )}
      </div> */}
      <div className="activate-crm">
        <Mutation
          mutation={gql`
            mutation Hypercard($clientId: ID!, $comp: String) {
              setClientHypercard(clientId: $clientId, component: $comp)
            }
          `}
        >
          {action => (
            <Button
              color="danger"
              size="lg"
              block
              onClick={triggerHypercard(action)}
              disabled={
                props.simulator.training ||
                !Object.values(state).find(s => s === true)
              }
            >
              {activated ? (
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
      <Tour steps={trainingSteps(props.displayName)} client={props.clientObj} />
    </div>
  );
};
export default Crm;
