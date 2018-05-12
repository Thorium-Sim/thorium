import React, { Component } from "react";
import { Col, Row, Container, Button, Card, CardBody, Alert } from "reactstrap";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import semver from "semver";
import Tour from "reactour";

import "./welcome.css";

const FLIGHT_SUB = gql`
  subscription FlightsChanged {
    flightsUpdate {
      id
      name
      date
    }
  }
`;

const quotes = [
  "Not all who wander are lost",
  "If you don’t know where your destination is, you don’t know how long you have to wander",
  "Its origin and purpose are still a total mystery...",
  "For everything, there is a first time",
  "I like to believe that there are always possibilities",
  "Sometimes a feeling is all we humans have to go on.",
  "Failure is the mark of a life well lived. In turn, the only way to live without failure is to be of no use to anyone.",
  "History has its eyes on you.",
  "We take one step at a time. In doing so we reach toward the unknown.",
  "Where does this lead us? Where do we go?",
  "If you listen carefully, the silence is beautiful.",
  "The man who has no imagination has no wings.",
  "Life before death. Strength before weakness. Journey before destination.",
  "We are the ones we have been waiting for.",
  "I am burdened with glorious purpose."
];

class Welcome extends Component {
  subscription = null;
  state = {
    issuesOpen: false,
    quote: quotes[Math.floor(Math.random() * quotes.length)]
  };
  componentDidMount() {
    if (!process.env.CI) {
      fetch("https://api.github.com/repos/thorium-sim/thorium/tags")
        .then(res => res.json())
        .then(res => {
          if (
            semver.gt(res[0].name, require("../../../package.json").version)
          ) {
            this.setState({ outdated: res[0].name });
          }
        })
        .catch(() => {
          //Oh well.
        });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: FLIGHT_SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            flights: subscriptionData.data.flightsUpdate
          });
        }
      });
    }
  }
  trainingSteps = () => {
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
  render() {
    if (this.props.data.loading || !this.props.data.flights) return null;
    const flights = this.props.data.flights;
    return (
      <Container className="WelcomeView">
        <Row>
          <Col sm={12} className="title-row">
            <h1 className="text-center">Thorium</h1>
            <h3 className="text-center">
              <small>{this.state.quote}</small>
            </h3>
            {this.state.outdated && (
              <Alert color="warning">
                Your version of Thorium is outdated. Current version is{" "}
                {this.state.outdated}. Your version is{" "}
                {require("../../../package.json").version}.
                <p>
                  <small>
                    The update is downloading in the background. Wait until the
                    Thorium Server command line window says "Download Complete"
                    before restarting Thorium Server
                  </small>
                </p>
              </Alert>
            )}
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
                    <p>{f.name}</p>{" "}
                    <small>{formatDate(new Date(f.date))}</small>
                  </Link>
                ))}
              </CardBody>
            </Card>
          </div>
          <div>
            <h4 className="text-center">or</h4>
          </div>
          <div className="new-flight">
            <h3>Start a new Flight</h3>
            <Button
              tag={Link}
              to="/config/flight"
              color="success"
              block
              size="lg"
            >
              New Flight
            </Button>
          </div>
        </Row>
        <Tour
          steps={this.trainingSteps()}
          isOpen={this.props.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

export const FLIGHTS_QUERY = gql`
  query Flights {
    flights(running: true) {
      id
      name
      date
    }
  }
`;

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

export default graphql(FLIGHTS_QUERY)(Welcome);
