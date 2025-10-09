import React, {Fragment} from "react";
import {Button} from "helpers/reactstrap";
import {Mutation} from "react-apollo";
import gql from "graphql-tag.macro";

const RunningCheck = ({flight}) =>
  flight && !flight.running ? (
    <Fragment>
      <Mutation
        mutation={gql`
          mutation ResumeFlight($flightId: ID!) {
            resumeFlight(flightId: $flightId)
          }
        `}
        variables={{flightId: flight.id}}
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
      <strong className="text-warning" style={{marginLeft: "8px"}}>
        Flight is paused
      </strong>
    </Fragment>
  ) : (
    <Mutation
      mutation={gql`
        mutation PauseFlight($flightId: ID!) {
          pauseFlight(flightId: $flightId)
        }
      `}
      variables={{flightId: flight.id}}
    >
      {action => (
        <Button
          className="pause-flight"
          color="warning"
          size="sm"
          onClick={action}
        >
          Pause Flight
        </Button>
      )}
    </Mutation>
  );

export default RunningCheck;
