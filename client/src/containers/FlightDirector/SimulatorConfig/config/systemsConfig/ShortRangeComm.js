import React from "react";
import GenericSystemConfig from "./Generic";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "reactstrap";
import SignalsCore from "components/views/CommShortRange/signalsCore";
import uuid from "uuid";

const ShortRangeComm = props => {
  const { id, simulatorId } = props;
  const defaultSignals = action => which => {
    const defaultSignals = {
      trek: [
        {
          id: uuid.v4(),
          image: "/Comm Images/Romulan.png",
          name: "Romulan",
          color: "#00ff00",
          range: { upper: 1, lower: 0.85 }
        },
        {
          id: uuid.v4(),
          image: "/Comm Images/Cardassian.png",
          name: "Cardassian",
          color: "#ffaa00",
          range: { upper: 0.85, lower: 0.75 }
        },
        {
          id: uuid.v4(),
          image: "/Comm Images/General Use.png",
          name: "General Use",
          color: "#ffffff",
          range: { upper: 0.75, lower: 0.58 }
        },
        {
          id: uuid.v4(),
          image: "/Comm Images/Starfleet.png",
          name: "Starfleet",
          color: "#0088ff",
          range: { upper: 0.58, lower: 0.4 }
        },
        {
          id: uuid.v4(),
          image: "/Comm Images/Klingon.png",
          name: "Klingon",
          color: "#ff0000",
          range: { upper: 0.4, lower: 0.3 }
        },
        {
          id: uuid.v4(),
          image: "/Comm Images/Orion.png",
          name: "Orion",
          color: "#888888",
          range: { upper: 0.3, lower: 0.22 }
        },
        {
          id: uuid.v4(),
          image: "/Comm Images/Ferengi.png",
          name: "Ferengi",
          color: "#ffff00",
          range: { upper: 0.22, lower: 0 }
        }
      ]
    };
    action({ variables: { id, signals: defaultSignals[which] } });
  };

  return (
    <GenericSystemConfig {...props}>
      <div>Default Comm Signals</div>
      <Mutation
        mutation={gql`
          mutation UpdateSignals($id: ID!, $signals: [CommSignalInput]!) {
            commUpdateSignals(id: $id, signals: $signals)
          }
        `}
      >
        {action => (
          <Button size="sm" onClick={() => defaultSignals(action)("trek")}>
            Star Trek
          </Button>
        )}
      </Mutation>
      <div style={{ height: `calc(100% - 60px)` }}>
        <SignalsCore simulator={{ id: simulatorId }} />
      </div>
    </GenericSystemConfig>
  );
};
export default ShortRangeComm;
