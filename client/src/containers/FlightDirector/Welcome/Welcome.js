import React from "react";
import { Col, Row, Container, Card, CardBody } from "reactstrap";
import gql from "graphql-tag.macro";
import { Link } from "react-router-dom";
import Tour from "helpers/tourHelper";
import { FormattedMessage } from "react-intl";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./welcome.scss";
import QuoteOfTheDay from "./QuoteOfTheDay";
import TrackerPopup from "./TrackerPopup";
import AutoUpdate from "./AutoUpdate";
import NewFlight from "./NewFlight";
import { useQuery } from "@apollo/react-hooks";

export const FLIGHTS_QUERY = gql`
  query Flights {
    thorium {
      autoUpdate
      askedToTrack
    }
    flights {
      id
      name
      date
    }
  }
`;

const FLIGHT_SUB = gql`
  subscription FlightsChanged {
    flightsUpdate {
      id
      name
      date
    }
  }
`;

const Welcome = ({ training, stopTraining }) => {
  const trainingSteps = () => {
    return [
      {
        selector: ".nothing",
        content:
          "Welcome to Thorium! This training is available to you on several screens and will walk you through the basics of how to set up and run a Thorium flight."
      },
      {
        selector: ".menu-button",
        content:
          "Use this menu to go to the other config screens. These screens are used to import and edit simulators and missions, and add assets, sets, keyboards, and more. You should go through the help on each screen to become familiar with the features and how you would use them."
      },
      {
        selector: ".running-flight",
        content:
          "This list shows all of the currently running flights. A flight is a single instance of a simulated experience, and can be paused and resumed at a later time."
      },
      {
        selector: ".new-flight",
        content:
          "To do anything in a Thorium simulator, you have to start a flight. Click this button to do so."
      }
    ];
  };
  const handleImport = evt => {
    const data = new FormData();
    Array.from(evt.target.files).forEach((f, index) =>
      data.append(`files[${index}]`, f)
    );
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${parseInt(
        window.location.port,
        10
      ) + 1}/importFlight`,
      {
        method: "POST",
        body: data
      }
    ).then(() => {
      //  window.location.reload();
    });
  };
  const { loading, data, subscribeToMore } = useQuery(FLIGHTS_QUERY);
  if (loading || !data.flights) return null;
  const { flights, thorium } = data;
  const { autoUpdate, askedToTrack } = thorium;
  return (
    <Container className="WelcomeView">
      <SubscriptionHelper
        subscribe={() =>
          subscribeToMore({
            document: FLIGHT_SUB,
            updateQuery: (previousResult, { subscriptionData }) => {
              return Object.assign({}, previousResult, {
                flights: subscriptionData.data.flightsUpdate
              });
            }
          })
        }
      />
      <Row>
        <Col sm={12} className="title-row">
          <h1 className="text-center">Thorium</h1>
          <h6 className="text-center">
            <Link to="/releases">
              <FormattedMessage
                id="version-number"
                defaultMessage="Version {version}"
                values={{
                  version: require("../../../../package.json").version
                }}
              />
            </Link>
          </h6>
          <QuoteOfTheDay />
          <TrackerPopup askedToTrack={askedToTrack} />
          <AutoUpdate autoUpdate={autoUpdate} />
        </Col>
      </Row>
      <Row className="content-row">
        <div className="running-flight">
          <h3>Pick a running Flight</h3>
          <Card>
            <CardBody>
              {flights.map(f => (
                <Link
                  to={`/config/flight/${f.id}`}
                  key={f.id}
                  className="flight-picker"
                >
                  <p>{f.name}</p> <small>{formatDate(new Date(f.date))}</small>
                </Link>
              ))}
            </CardBody>
          </Card>
          <label style={{ display: "block" }}>
            <div className="btn btn-info btn-block">Import Flight</div>
            <input type="file" hidden onChange={handleImport} />
          </label>
        </div>
        <div>
          <h4 className="text-center">or</h4>
        </div>
        <NewFlight />
      </Row>
      <Tour
        steps={trainingSteps()}
        training={training}
        onRequestClose={stopTraining}
      />
    </Container>
  );
};

function formatDate(date) {
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getHours();
  let am = "AM";
  hour = hour > 12 ? ((am = "PM"), hour - 12) : hour;
  let minute = date.getMinutes();

  return (
    monthNames[monthIndex] +
    " " +
    day +
    ", " +
    year +
    " " +
    hour +
    ":" +
    minute +
    " " +
    am
  );
}

export default Welcome;
