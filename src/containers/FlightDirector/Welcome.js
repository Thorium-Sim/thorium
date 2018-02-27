import React, { Component } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert
} from "reactstrap";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import IssueTracker from "../../components/admin/IssueTracker";
import semver from "semver";
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
  "We are the ones we have been waiting for."
];

class Welcome extends Component {
  subscription = null;
  state = { issuesOpen: false };
  componentDidMount() {
    if (process.env.CI) {
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
  toggleIssueTracker = () => {
    this.setState({
      issuesOpen: !this.state.issuesOpen
    });
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
              <small>{quotes[Math.floor(Math.random() * quotes.length)]}</small>
            </h3>
            {this.state.outdated && (
              <Alert color="warning">
                Your version of Thorium is outdated. Current version is{" "}
                {this.state.outdated}. Your version is{" "}
                {require("../../../package.json").version}.{" "}
                <a
                  href="http://thoriumsim.com/en/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click here to get the latest version.
                </a>
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="content-row">
          <div>
            <h3>Pick a running Flight</h3>
            <Card>
              <CardBody>
                {flights.map(f => (
                  <Link
                    to={`/flight/${f.id}`}
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
          <div>
            <h3>Start a new Flight</h3>
            <Button
              tag={Link}
              to="/flightConfig"
              color="success"
              block
              size="lg"
            >
              New Flight
            </Button>
          </div>
        </Row>
        <Row className="config-row">
          <Col>
            <Button tag={Link} to="/simulatorConfig" color="info" block>
              Configure Simulators
            </Button>
          </Col>
          <Col>
            <Button tag={Link} to="/assetConfig" color="info" block>
              Configure Generic Assets
            </Button>
          </Col>

          <Col>
            <Button tag={Link} to="/missionConfig" color="info" block>
              Configure Missions
            </Button>
          </Col>
          <Col>
            <Button tag={Link} to="/setConfig" color="info" block>
              Configure Sets
            </Button>
          </Col>

          <Col>
            <Button tag={Link} to="/tacticalConfig" color="info" block>
              Configure Tactical Maps
            </Button>
          </Col>
          {process.env.NODE_ENV !== "production" && (
            <Col>
              <Button tag={Link} to="/debug" color="secondary" block>
                Debug
              </Button>
            </Col>
          )}
          {process.env.NODE_ENV !== "production" && (
            <Col>
              <Button tag={Link} to="/flight/c/core" color="secondary" block>
                Debug Core
              </Button>
            </Col>
          )}
          <Col>
            <Button color="primary" block onClick={this.toggleIssueTracker}>
              Bug Report/Feature Request
            </Button>
          </Col>
          <Col>
            <Button color="warning" block tag={Link} to="/softwarePanels">
              Software Panel Config
            </Button>
          </Col>
          <Col>
            <Button color="warning" block tag={Link} to="/surveyForms">
              Survey Form Config
            </Button>
          </Col>
        </Row>
        <Modal isOpen={this.state.issuesOpen} toggle={this.toggleIssueTracker}>
          <ModalHeader toggle={this.toggleIssueTracker}>
            Submit a Feature/Bug Report
          </ModalHeader>
          <ModalBody>
            <IssueTracker close={this.toggleIssueTracker} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleIssueTracker}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
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
