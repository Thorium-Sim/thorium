import { graphql, withApollo } from "@apollo/client";
import React from "react";
import {HullPlating, Simulator} from "generated/graphql";
import gql from "graphql-tag.macro";
import {Row, Col, Container, Button} from "helpers/reactstrap";
import {FormattedMessage} from "react-intl";
import DamageOverlay from "../helpers/DamageOverlay";
import Tour from "helpers/tourHelper";
import {HullPlatingModeConstants} from "./constants";
import SubscriptionHelper from "helpers/subscriptionHelper";
import RadiationBackground from "./videos/Radiation-Background.gif";
import DisabledBackground from "./videos/Disabled-Background.gif";
import KineticBackground from "./videos/Kinetic-Background.gif";
import EnergyBackground from "./videos/Energy-Background.gif";
import "./style.scss";

interface HullPlatingProps {
  children: React.ReactNode;
  simulator: Simulator;
  data?: {loading?: any; hullPlatings?: HullPlating[]};
  client?: any;
}

export const HULL_PLATING_SUB = gql`
  subscription HullPlatingUpdate($simulatorId: ID!) {
    hullPlatingUpdate(simulatorId: $simulatorId) {
      id
      simulatorId
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      name
      engaged
      mode
      pulse
    }
  }
`;

export const HULL_PLATING_QUERY = gql`
  query HullPlating($simulatorId: ID!) {
    hullPlatings(simulatorId: $simulatorId) {
      id
      simulatorId
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
      }
      name
      engaged
      mode
      pulse
    }
  }
`;

const TrainingSteps = [
  {
    selector: ".activate-btn",
    content: (
      <FormattedMessage
        id={"hull-plating-training-1"}
        defaultMessage="This system allows you to strengthen your ship's outer hull, reducing damage from difference types of projectiles or energy sources. To activate your armor, press the button here"
      />
    ),
  },
  {
    selector: ".mode-btns",
    content: (
      <FormattedMessage
        id={"hull-plating-training-2"}
        defaultMessage="When the system is engaged, you can select the mode you would like to use. Each mode has different advantages. Try different modes to gain difference advantages"
      />
    ),
  },
  {
    selector: ".effective-chart",
    content: (
      <FormattedMessage
        id={"hull-plating-training-3"}
        defaultMessage="This graph shows how well the armor is working. If the line is flat, it's not very effective. If the line moves more rapidly, the armor is more effective. If you change armor types, it will take some time for the armor to become effective again."
      />
    ),
  },
];

const HullPlatingComp: React.FC<HullPlatingProps> = props => {
  if (!props.data || props.data.loading) {
    return <div>No Values</div>;
  }
  const hullPlating = props.data.hullPlatings && props.data.hullPlatings[0];
  if (!hullPlating) {
    return <div>No Template</div>;
  }

  const handleEngageClick = () => {
    const mutation = gql`
      mutation SwitchHullPlatingMode($id: ID!, $engaged: Boolean!) {
        setHullPlatingEngaged(id: $id, engaged: $engaged)
      }
    `;
    const variables = {
      id: hullPlating.id,
      engaged: !hullPlating.engaged,
    };
    props.client.mutate({
      mutation,
      variables,
    });
  };

  const generateClickFunction = (mode: string) => {
    return () => {
      const mutation = gql`
        mutation SwitchHullPlatingMode($id: ID!, $mode: HULL_PLATING_MODE!) {
          setHullPlatingMode(id: $id, mode: $mode)
        }
      `;
      const variables = {
        id: hullPlating.id,
        mode: mode,
      };
      props.client.mutate({
        mutation,
        variables,
      });
    };
  };

  const generateHullPlatingImg = (hullPlating: HullPlating) => {
    let src = DisabledBackground;
    if (hullPlating.engaged) {
      if (hullPlating.mode === "kinetic") {
        src = KineticBackground;
      } else if (hullPlating.mode === "energy") {
        src = EnergyBackground;
      } else {
        src = RadiationBackground;
      }
    }
    return (
      <img
        style={{height: "90vh", marginTop: "-3vh"}}
        draggable={false}
        alt="hull plating background"
        src={src}
      />
    );
  };

  const generateEnergyVideo = (hullPlating: HullPlating) => {
    let src = require("./videos/Offline.mp4");
    if (hullPlating.engaged) {
      if (hullPlating.mode === "kinetic") {
        src = require(`./videos/Kinetic-${
          hullPlating.pulse ? "High" : "Low"
        }.mp4`);
      } else if (hullPlating.mode === "energy") {
        src = require(`./videos/Energy-${
          hullPlating.pulse ? "High" : "Low"
        }.mp4`);
      } else {
        src = require(`./videos/Rad-${hullPlating.pulse ? "High" : "Low"}.mp4`);
      }
    }
    return <video width={"100%"} src={src} autoPlay muted loop />;
  };

  return (
    <Container fluid className="flex-column card-hullPlating">
      <DamageOverlay
        system={hullPlating}
        message={`${hullPlating.displayName || hullPlating.name} Offline`}
      />
      <SubscriptionHelper
        subscribe={() =>
          (props as any).data.subscribeToMore({
            document: HULL_PLATING_SUB,
            variables: {simulatorId: props.simulator.id},
            updateQuery: (previousResult: any, {subscriptionData}: any) => {
              return Object.assign({}, previousResult, {
                hullPlatings: subscriptionData.data.hullPlatingUpdate,
              });
            },
          })
        }
      />
      <Row>
        <Col sm={8}>
          <div className="hull-plating-img-parent">
            {generateHullPlatingImg(hullPlating)}
            <div className="hull-plating-activate-btn-parent">
              <div className="activate-btn">
                {!hullPlating.engaged && (
                  <Button
                    onMouseDown={() => handleEngageClick()}
                    color={"primary"}
                    block={true}
                    size={"lg"}
                  >
                    <FormattedMessage
                      id={"hull-plating-engage"}
                      defaultMessage="Engage"
                    />{" "}
                  </Button>
                )}
                {hullPlating.engaged && (
                  <Button
                    onMouseDown={() => handleEngageClick()}
                    color={"danger"}
                    block={true}
                    size={"lg"}
                  >
                    <FormattedMessage
                      id={"hull-plating-disengage"}
                      defaultMessage="Disengage"
                    />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Col>
        <Col sm={4}>
          <div className="hull-plating-buttons-parent">
            <div className="mode-btns">
              {HullPlatingModeConstants.map(each => {
                // This isn't localized because you can't have FM's have dynamic ids (afaik). If we want to localize them, we'll just need to hard code them.
                return (
                  <Button
                    color={each.color}
                    onMouseDown={generateClickFunction(each.value)}
                  >
                    {each.name}
                  </Button>
                );
              })}
            </div>
            <div className="effective-chart">
              {generateEnergyVideo(hullPlating)}
            </div>
          </div>
        </Col>
      </Row>
      <Tour steps={TrainingSteps} />
    </Container>
  );
};

export default graphql(HULL_PLATING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {simulatorId: (ownProps as any).simulator.id},
  }),
})(withApollo(HullPlatingComp as any));
