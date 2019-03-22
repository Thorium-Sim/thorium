import React, { Fragment } from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

const RunningCheck = ({ flight }) =>
  flight && !flight.running ? (
    <Fragment>
      <strong className="text-warning">Flight is paused</strong>
      <Mutation
        mutation={gql`
          mutation ResumeFlight($flightId: ID!) {
            resumeFlight(flightId: $flightId)
          }
        `}
        variables={{ flightId: flight.id }}
      >
        {action => (
          <Button
            className="pause-flight"
            color="success"
            size="sm"
            onClick={action}
          >
            Resume Flight
          </Button>
        )}
      </Mutation>
    </Fragment>
  ) : null;
export default RunningCheck;
