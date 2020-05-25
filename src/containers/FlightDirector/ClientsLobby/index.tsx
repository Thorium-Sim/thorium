import React from "react";
import Clients, {trainingSteps as clientsTraining} from "../Clients";
import SetsPicker, {trainingSteps as setsTraining} from "./SetsPicker";
import {Link, useParams} from "react-router-dom";
import {Container, Button, ButtonGroup} from "helpers/reactstrap";
import Tour from "helpers/tourHelper";
import {useNavigate} from "react-router-dom";
import {TrainingContext} from "containers/TrainingContextProvider";
import {
  useFlightQuery,
  FlightDocument,
  useResetFlightMutation,
  usePauseFlightMutation,
  useLobbyResumeFlightMutation,
  useDeleteFlightMutation,
  useTransmitFlightMutation,
} from "generated/graphql";

const trainingSteps = [
  {
    selector: ".nothing",
    content: (
      <span>
        This is the client lobby. Here, you can see all connected clients and
        assign them to their corresponding flight, simulator, and station.
      </span>
    ),
  },
  {
    selector: ".delete-flight",
    content: (
      <span>
        When a flight is complete, click this button to delete the flight. All
        record of the flight will be eliminated.
      </span>
    ),
  },
  {
    selector: ".reset-flight",
    content: (
      <span>
        This button will reset the flight to the state it was in when it was
        first created. This is helpful for resetting all of the controls after
        training mode.
      </span>
    ),
  },
  {
    selector: ".pause-flight",
    content: (
      <span>
        Flights can be paused. This causes all of the background processes for
        the flight, such as reactor and engine heat, to stop so things don't
        overheat while the crew is taking a break.
      </span>
    ),
  },
]
  .concat(setsTraining)
  .concat(clientsTraining)
  .concat({
    selector: ".move-on",
    content: (
      <span>
        Click this link to go to the core, where you can control the flight.
      </span>
    ),
  });

const ClientLobby: React.FC = () => {
  const {flightId = ""} = useParams();
  const navigate = useNavigate();

  const {training, stopTraining} = React.useContext(TrainingContext);

  const [pauseFlight] = usePauseFlightMutation({
    variables: {flightId},
    refetchQueries: [{query: FlightDocument}],
  });
  const [resumeFlight] = useLobbyResumeFlightMutation({
    variables: {flightId},
    refetchQueries: [{query: FlightDocument}],
  });
  const [resetFlightMutation] = useResetFlightMutation({variables: {flightId}});
  const [deleteFlightMutation] = useDeleteFlightMutation({
    variables: {flightId},
  });
  const [
    transmitFlightMutation,
    {loading: transmitLoading},
  ] = useTransmitFlightMutation({
    variables: {flightId},
    refetchQueries: [{query: FlightDocument}],
  });

  const {data, loading} = useFlightQuery();
  const resetFlight = () => {
    if (
      window.confirm(
        `Are you sure you want to reset this flight?
All information in all simulators in this flight will be reset.`,
      )
    ) {
      resetFlightMutation();
    }
  };
  const deleteFlight = (hasFlightType: boolean) => () => {
    if (
      window.confirm(
        `Are you sure you want to delete this flight?
It will permenantly erase all simulators running in this flight.`,
      )
    ) {
      if (hasFlightType) {
        if (
          !window.confirm(
            `This flight hasn't been transmitted to SpaceEdventures.org. Without transmitting this flight, all participants will not receive credit for this flight. Are you sure you want to delete this flight before transmitting?`,
          )
        )
          return;
      }
      deleteFlightMutation().then(() => {
        navigate(`/`);
      });
    }
  };

  const transmit = () => {
    if (
      window.confirm(`Are you sure you want to transmit this flight's information to SpaceEdVentures.org? 
This can only be done once per flight and should only be done when the flight is complete.`)
    ) {
      transmitFlightMutation();
    }
  };

  if (loading || !data) return null;
  const flight = data?.flights?.find(f => f?.id === flightId);
  if (!flight) return <div>Error loading flight...</div>;
  return (
    <Container className="flight-lobby">
      <span>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <h4>
            Flight Lobby: {flight.name}{" "}
            <small>
              <Link to="/">Return to Main</Link>
            </small>
          </h4>
          {!flight.running && (
            <h3 className="text-warning text-center">Flight is paused</h3>
          )}
        </div>
        <ButtonGroup>
          <Button
            className="delete-flight"
            color="danger"
            onClick={deleteFlight(Boolean(flight?.flightType))}
          >
            Delete Flight
          </Button>
          <Button
            className="reset-flight"
            color="warning"
            onClick={resetFlight}
          >
            Reset Flight
          </Button>
          {flight.running ? (
            <Button className="pause-flight" color="info" onClick={pauseFlight}>
              Pause Flight
            </Button>
          ) : (
            <Button
              className="pause-flight"
              color="success"
              onClick={resumeFlight}
            >
              Resume Flight
            </Button>
          )}
          <Button tag="a" href={`/exportFlight/${flightId}`} color="info">
            Export Flight
          </Button>
          {!flight.transmitted && !transmitLoading && (
            <Button color="dark" onClick={transmit}>
              Transmit to Space EdVentures
            </Button>
          )}
        </ButtonGroup>
        <h5 className="text-right">
          <Link to={`/flight/${flightId}/core`} className="move-on">
            Go to Core
          </Link>
        </h5>
      </span>
      <SetsPicker />
      <Clients />
      <Tour
        steps={trainingSteps}
        training={training}
        onRequestClose={stopTraining}
      />
    </Container>
  );
};

export default ClientLobby;
