import React, { Fragment, Component } from "react";
import {
  Col,
  Row,
  Container,
  Button,
  Card,
  CardBody,
  Alert,
  UncontrolledDropdown as Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import gql from "graphql-tag.macro";
import { graphql, Mutation, Query } from "react-apollo";
import { Link } from "react-router-dom";
import semver from "semver";
import Tour from "helpers/tourHelper";
import { FormattedMessage } from "react-intl";
import SubscriptionHelper from "helpers/subscriptionHelper";
import "./welcome.scss";

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
  "I am burdened with glorious purpose.",
  "While you live, shine; have no grief at all. Life exists only for a short while and Time demands his due.",
  "The hardest choices require the strongest wills.",
  "Like a snowflake in a blizzard..."
];

class Welcome extends Component {
  subscription = null;
  state = {
    issuesOpen: false,
    quote: quotes[Math.floor(Math.random() * quotes.length)],
    askedToTrack: false
  };
  componentDidMount() {
    if (!process.env.CI) {
      fetch("https://api.github.com/repos/thorium-sim/thorium/tags")
        .then(res => res.json())
        .then(res => {
          if (
            semver.gt(res[0].name, require("../../../package.json").version) &&
            semver(res[0].name).prerelease.length === 0
          ) {
            this.setState({ outdated: res[0].name });
          }
          if (
            semver.minor(res[0].name) >
              semver.minor(require("../../../package.json").version) ||
            semver.major(res[0].name) >
              semver.major(require("../../../package.json").version)
          ) {
            this.setState({ major: true });
          }
        })
        .catch(() => {
          //Oh well.
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
  handleImport = evt => {
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
  render() {
    if (this.props.data.loading || !this.props.data.flights) return null;
    const flights = this.props.data.flights;
    const { autoUpdate, askedToTrack } = this.props.data.thorium;
    const { askedToTrack: stateAskedToTrack } = this.state;
    return (
      <Container className="WelcomeView">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
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
                    version: require("../../../package.json").version
                  }}
                />
              </Link>
            </h6>
            <h3 className="text-center">
              <small>{this.state.quote}</small>
            </h3>
            {!askedToTrack && !stateAskedToTrack && (
              <Alert color={"info"}>
                <FormattedMessage
                  id="ask-to-track"
                  defaultMessage="Would you like opt-in to share some analytics data about Thorium with the developer? You can opt-out at any time from the Settings sidebar menu."
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {!this.state.upgrading && (
                    <Mutation
                      mutation={gql`
                        mutation SetTrackingPreference($pref: Boolean!) {
                          setTrackingPreference(pref: $pref)
                        }
                      `}
                    >
                      {action => (
                        <Fragment>
                          <Button
                            outline
                            color="secondary"
                            onClick={() => {
                              action({ variables: { pref: false } });
                              this.setState({
                                askedToTrack: true
                              });
                            }}
                            style={{ marginRight: "20px" }}
                          >
                            <FormattedMessage
                              id="no-track"
                              defaultMessage="No Thanks"
                            />
                          </Button>
                          <Button
                            outline
                            color="secondary"
                            onClick={() => {
                              action({ variables: { pref: true } });
                              this.setState({
                                askedToTrack: true
                              });
                            }}
                          >
                            <FormattedMessage
                              id="track-me"
                              defaultMessage="Track Me"
                            />
                          </Button>
                        </Fragment>
                      )}
                    </Mutation>
                  )}
                </div>
              </Alert>
            )}
            {autoUpdate && (this.state.outdated || this.state.upgrading) && (
              <Alert color={this.state.major ? "danger" : "warning"}>
                <FormattedMessage
                  id="upgrade-warning"
                  defaultMessage="Your version of Thorium is outdated. Current version is {newVersion}. Your version is {oldVersion}"
                  values={{
                    oldVersion: require("../../../package.json").version,
                    newVersion: this.state.outdated
                  }}
                />{" "}
                {this.state.major && (
                  <strong>
                    <FormattedMessage
                      id="major-upgrade-warning"
                      defaultMessage="This is a major upgrade. Make sure you backup your Thorium data directory and program file before performing this upgrade."
                    />
                  </strong>
                )}
                <p>
                  {!this.state.upgrading && (
                    <Mutation
                      mutation={gql`
                        mutation TriggerAutoUpdate {
                          triggerAutoUpdate
                        }
                      `}
                    >
                      {action => (
                        <Button
                          outline
                          color="secondary"
                          onClick={() => {
                            action();
                            this.setState({
                              outdated: false,
                              upgrading: true
                            });
                          }}
                        >
                          Download Update
                        </Button>
                      )}
                    </Mutation>
                  )}
                  {this.state.upgrading && (
                    <small>
                      <FormattedMessage
                        id="upgrade-instructions"
                        defaultMessage="The update is downloading in the background. Wait until the Thorium Server command line window says 'Download Complete' before restarting Thorium Server"
                      />
                    </small>
                  )}
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
            <label style={{ display: "block" }}>
              <div className="btn btn-info btn-block">Import Flight</div>
              <input type="file" hidden onChange={this.handleImport} />
            </label>
          </div>
          <div>
            <h4 className="text-center">or</h4>
          </div>
          <div className="new-flight">
            <h3>Start a new Flight</h3>
            <Query
              query={gql`
                query {
                  thorium {
                    spaceEdventuresCenter {
                      id
                      name
                      flightTypes {
                        id
                        name
                        classHours
                        flightHours
                      }
                    }
                  }
                }
              `}
            >
              {({ loading, data }) =>
                !loading &&
                data.thorium &&
                data.thorium.spaceEdventuresCenter &&
                data.thorium.spaceEdventuresCenter.flightTypes &&
                data.thorium.spaceEdventuresCenter.flightTypes.length > 0 ? (
                  <Dropdown>
                    <DropdownToggle caret size="lg" block color="success">
                      New Flight
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem tag={Link} to="/config/flight">
                        Unspecified Flight Type
                      </DropdownItem>
                      <DropdownItem divider />
                      {data.thorium.spaceEdventuresCenter.flightTypes.map(f => (
                        <DropdownItem
                          tag={Link}
                          to={`/config/flight?flightType=${f.id}`}
                          key={f.id}
                          value={f.id}
                        >
                          {f.name}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <Button
                    tag={Link}
                    to="/config/flight"
                    color="success"
                    block
                    size="lg"
                  >
                    New Flight
                  </Button>
                )
              }
            </Query>
          </div>
        </Row>
        <Tour
          steps={this.trainingSteps()}
          training={this.props.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

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
