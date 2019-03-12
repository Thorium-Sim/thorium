import React, { useState, useEffect, useRef } from "react";
import { Container, Button, ButtonGroup } from "reactstrap";
import gql from "graphql-tag.macro";
import { OutputField } from "../../generic/core";
import { Query } from "react-apollo";
import { titleCase } from "change-case";
import TorpedoInventory from "./inventory";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const TorpedoView = ({ torpedo }) => {
  const loaded = torpedo.inventory.find(t => t.id === torpedo.loaded);
  const lastLoaded = usePrevious(loaded);
  return (
    <>
      <OutputField alert={torpedo.state === "fired"}>
        {(() => {
          if (torpedo.state === "idle") return "No Torpedos Loaded";

          return `${titleCase(
            loaded ? loaded.type : lastLoaded && lastLoaded.type
          )} Torpedo ${torpedo.state === "loaded" ? "Loaded" : "Fired"}`;
        })()}
      </OutputField>
      <TorpedoInventory {...torpedo} />
    </>
  );
};
const TorpedoSwitcher = ({ torpedos, selectTorpedo, selectedTorpedo }) => {
  return (
    <ButtonGroup>
      {torpedos.map((t, i) => (
        <Button
          size="sm"
          key={t.id}
          active={t.id === selectedTorpedo || (!selectedTorpedo && i === 0)}
          onClick={() => selectTorpedo(t.id)}
        >
          {t.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};
const TorpedoLoadingCore = ({ torpedos }) => {
  const [selectedTorpedo, setSelectedTorpedo] = useState(torpedos[0].id);
  const torpedo = torpedos.find(t => t.id === selectedTorpedo);
  return (
    <Container fluid className="torpedos-core">
      <TorpedoSwitcher
        torpedos={torpedos}
        selectTorpedo={torp => setSelectedTorpedo(torp)}
        selectedTorpedo={selectedTorpedo}
      />
      <TorpedoView torpedo={torpedo} />
    </Container>
  );
};

const fragment = gql`
  fragment TorpedoCoreData on Torpedo {
    id
    name
    loaded
    inventory {
      id
      type
      probe
    }
    state
  }
`;

const TORPEDO_SUB = gql`
  subscription TorpedosUpdate($simulatorId: ID!) {
    torpedosUpdate(simulatorId: $simulatorId) {
      ...TorpedoCoreData
    }
  }
  ${fragment}
`;

const TORPEDO_QUERY = gql`
  query Torpedos($simulatorId: ID!) {
    torpedos(simulatorId: $simulatorId) {
      ...TorpedoCoreData
    }
  }
  ${fragment}
`;

const TorpedoData = props => {
  const {
    simulator: { id: simulatorId }
  } = props;
  return (
    <Query query={TORPEDO_QUERY} variables={{ simulatorId }}>
      {({ loading, data, subscribeToMore }) => {
        const { torpedos } = data;
        if (loading || !torpedos) return null;
        if (!torpedos[0]) return <div>No Torpedos</div>;
        return (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: TORPEDO_SUB,
                variables: { simulatorId },
                updateQuery: (previousResult, { subscriptionData }) => {
                  debugger;
                  return Object.assign({}, previousResult, {
                    torpedos: subscriptionData.data.torpedosUpdate
                  });
                }
              })
            }
          >
            <TorpedoLoadingCore {...props} torpedos={torpedos} />
          </SubscriptionHelper>
        );
      }}
    </Query>
  );
};

export default TorpedoData;
