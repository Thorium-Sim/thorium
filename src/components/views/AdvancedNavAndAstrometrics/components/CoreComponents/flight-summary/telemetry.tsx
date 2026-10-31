import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag.macro";
import {Progress} from "reactstrap";
import SubscriptionHelper from "helpers/subscriptionHelper";
import {NearestPoi} from "../../../helpers/flightSummary";
import "./flight-summary.scss";

const VELOCITY_QUERY = gql`
  query AdvancedNavStars($simulatorId: ID!) {
    advancedNavStars(simulatorId: $simulatorId) {
      velocity
      activating
    }
  }
`;
const VELOCITY_SUB = gql`
  subscription AdvancedNavStarsUpdate($simulatorId: ID!) {
    advancedNavStarsUpdate(simulatorId: $simulatorId) {
      velocity
      activating
    }
  }
`;

const Velocity: React.FC<{simulatorId: string; speedName?: string}> = ({
  simulatorId,
  speedName,
}) => (
  <Query query={VELOCITY_QUERY} variables={{simulatorId}}>
    {({data, subscribeToMore}: any) => {
      const stars = data?.advancedNavStars;
      return (
        <>
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: VELOCITY_SUB,
                variables: {simulatorId},
                updateQuery: (previousResult: any, {subscriptionData}: any) => {
                  const next = subscriptionData.data?.advancedNavStarsUpdate;
                  return next
                    ? Object.assign({}, previousResult, {
                        advancedNavStars: next,
                      })
                    : previousResult;
                },
              })
            }
          />
          <div className="core-adv-nav-value">
            {stars?.activating
              ? "Accelerating…"
              : `${(stars?.velocity || 0).toFixed(2)} LY/s`}
          </div>
          {speedName && <small>{speedName}</small>}
        </>
      );
    }}
  </Query>
);

export const Telemetry: React.FC<{
  simulatorId: string;
  speedName?: string;
  nearest: NearestPoi | null;
  // 0-1 fraction of the route flown; ignored while starting up.
  progress: number;
  starting: boolean;
  startupRemaining?: number | null;
  startupTotal?: number;
  moving: boolean;
}> = ({
  simulatorId,
  speedName,
  nearest,
  progress,
  starting,
  startupRemaining,
  startupTotal,
  moving,
}) => {
  const startupFraction =
    startupTotal && startupRemaining != null
      ? 1 - Math.max(0, startupRemaining) / startupTotal
      : 0;
  return (
    <>
      <div className="core-adv-nav-telemetry">
        <div>
          <p className="core-adv-nav-heading">Speed</p>
          <Velocity simulatorId={simulatorId} speedName={speedName} />
        </div>
        <div>
          <p className="core-adv-nav-heading">Nearest</p>
          {nearest ? (
            <>
              <div className="core-adv-nav-value" title={nearest.poi.name}>
                {nearest.poi.name}
              </div>
              <small>
                {nearest.distance.toFixed(1)} LY
                {nearest.hidden && (
                  <span className="badge badge-secondary ml-1">hidden</span>
                )}
              </small>
            </>
          ) : (
            <div className="core-adv-nav-value">—</div>
          )}
        </div>
      </div>
      {(starting || moving) && (
        <Progress
          striped={starting}
          animated={starting}
          color={starting ? "info" : "success"}
          value={(starting ? startupFraction : progress) * 100}
        >
          {starting
            ? `Spooling ${Math.ceil(startupRemaining || 0)}s`
            : `${Math.round(progress * 100)}%`}
        </Progress>
      )}
    </>
  );
};
