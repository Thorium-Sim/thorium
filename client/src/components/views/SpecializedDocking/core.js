import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import { ListGroup, ListGroupItem } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

const fragment = gql`
  fragment SpecializedDockingCoreData on DockingPort {
    id
    name
    clamps
    compress
    doors
    image
    docked
    damage {
      damaged
    }
    deck {
      id
      number
    }
    direction
    inventory {
      id
      name
      count
    }
  }
`;

const QUERY = gql`
  query Docking($simulatorId: ID!) {
    docking(simulatorId: $simulatorId, type: specialized) {
      ...SpecializedDockingCoreData
    }
  }
  ${fragment}
`;
const SUBSCRIPTION = gql`
  subscription DockingUpdate($simulatorId: ID!) {
    dockingUpdate(simulatorId: $simulatorId, type: specialized) {
      ...SpecializedDockingCoreData
    }
  }
  ${fragment}
`;

const SpecializedDockingCore = ({ docking }) => {
  const [selectedPort, setSelectedPort] = useState(null);

  const port =
    docking.length > 1 ? docking.find(d => d.id === selectedPort) : docking[0];

  const togglePort = (action, which) => () => {
    const update = {
      id: port.id,
      [which]: !port[which]
    };
    action({ variables: { port: update } });
  };
  return (
    <div className="specializedDocking-core">
      {docking.length > 1 && (
        <div className="port-list">
          <ListGroup>
            {docking.map(d => (
              <ListGroupItem
                key={d.id}
                active={selectedPort === d.id}
                onClick={() => setSelectedPort(d.id)}
              >
                {d.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      )}
      {port && (
        <Mutation
          mutation={gql`
            mutation UpdateShuttleBay($port: DockingPortInput!) {
              updateDockingPort(port: $port)
            }
          `}
        >
          {action => (
            <div className="port-config">
              <p>
                <strong>Name:</strong> {port.name}
              </p>
              <p>
                <strong>Deck:</strong> {port.deck && port.deck.number}
              </p>
              <p>
                <strong>Present:</strong>{" "}
                <input
                  type="checkbox"
                  checked={port.docked}
                  onChange={togglePort(action, "docked")}
                />
              </p>
              <p>
                <strong>Clamps:</strong>{" "}
                <input
                  type="checkbox"
                  checked={port.clamps}
                  onChange={togglePort(action, "clamps")}
                />
              </p>
              <p>
                <strong>Ramps:</strong>{" "}
                <input
                  type="checkbox"
                  checked={port.compress}
                  onChange={togglePort(action, "compress")}
                />
              </p>
              <p>
                <strong>Doors:</strong>{" "}
                <input
                  type="checkbox"
                  checked={port.doors}
                  onChange={togglePort(action, "doors")}
                />
              </p>
              <p>
                <strong>Inventory:</strong>{" "}
              </p>
              {port.inventory.map(i => (
                <p key={i.id}>
                  {i.count}: {i.name}
                </p>
              ))}
            </div>
          )}
        </Mutation>
      )}
    </div>
  );
};

const SpecializedSpecializedDockingCoreData = props => (
  <Query query={QUERY} variables={{ simulatorId: props.simulator.id }}>
    {({ loading, data, subscribeToMore }) => {
      const { docking } = data;
      if (loading || !docking) return null;
      if (!docking[0]) return <div>No Specialized Ports</div>;
      return (
        <SubscriptionHelper
          subscribe={() =>
            subscribeToMore({
              document: SUBSCRIPTION,
              variables: { simulatorId: props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  docking: subscriptionData.data.dockingUpdate
                });
              }
            })
          }
        >
          <SpecializedDockingCore {...props} docking={docking} />
        </SubscriptionHelper>
      );
    }}
  </Query>
);
export default SpecializedSpecializedDockingCoreData;
