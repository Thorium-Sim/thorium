import { graphql, withApollo } from "@apollo/client";
import React from "react";
import {HullPlating, Simulator} from "generated/graphql";
import gql from "graphql-tag.macro";
import {Container} from "helpers/reactstrap";

import SubscriptionHelper from "helpers/subscriptionHelper";
import "./style.scss";
import {HullPlatingModeConstants} from "./constants";
import {FormattedMessage} from "react-intl";

interface HullPlatingProps {
  children: React.ReactNode;
  simulator: Simulator;
  data?: {loading?: any; hullPlatings?: HullPlating[]};
  client: any;
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

const HullPlatingComp: React.FC<HullPlatingProps> = props => {
  if (!props.data || props.data.loading) {
    return (
      <div>
        <FormattedMessage
          id="hull-plating-no-values"
          defaultMessage="No Values"
        />{" "}
      </div>
    );
  }
  const hullPlating = props.data.hullPlatings && props.data.hullPlatings[0];

  if (!hullPlating) {
    return (
      <div>
        <FormattedMessage
          id="hull-plating-no-template"
          defaultMessage="No Template"
        />
      </div>
    );
  }

  const handleTypeSwitch = (mode: string) => {
    if (hullPlating) {
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
    }
  };
  const handleEngagedSwitch = () => {
    if (hullPlating) {
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
    }
  };

  const handlePulseClick = () => {
    const mutation = gql`
      mutation HullPlatingPulse($id: ID!, $pulse: Boolean!) {
        setHullPlatingPulse(id: $id, pulse: $pulse)
      }
    `;
    const variables = {
      id: hullPlating.id,
      pulse: true,
    };
    props.client.mutate({
      mutation,
      variables,
    });
  };

  const handlePulseDeactivateClick = () => {
    const mutation = gql`
      mutation HullPlatingPulse($id: ID!, $pulse: Boolean!) {
        setHullPlatingPulse(id: $id, pulse: $pulse)
      }
    `;
    const variables = {
      id: hullPlating.id,
      pulse: false,
    };
    props.client.mutate({
      mutation,
      variables,
    });
  };
  return (
    <Container fluid className="flex-column card-hullPlating">
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
      <div className="engaged-checkbox">
        <label>Hull plating engaged:</label>
        <input
          id="hull-plating-engaged"
          checked={hullPlating.engaged ? hullPlating.engaged : false}
          type="checkbox"
          onChange={val => {
            handleEngagedSwitch();
          }}
        ></input>
      </div>
      <div className="mode-picker">
        <select
          onChange={event => {
            event.target.value && handleTypeSwitch(event.target.value);
          }}
          value={
            hullPlating.mode
              ? hullPlating.mode
              : HullPlatingModeConstants[0].value
          }
        >
          {HullPlatingModeConstants.map(each => {
            return <option value={each.value}>{each.name}</option>;
          })}
        </select>
      </div>
      <div className="pulse-btn">
        <button onMouseDown={() => handlePulseClick()}>Pulse</button>
      </div>
      <div className="pulse-deactivate-btn">
        <button onMouseDown={() => handlePulseDeactivateClick()}>
          Deactivate Pulse
        </button>
      </div>
    </Container>
  );
};

export default graphql(HULL_PLATING_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {simulatorId: (ownProps as any).simulator.id},
  }),
})(withApollo(HullPlatingComp as any));
