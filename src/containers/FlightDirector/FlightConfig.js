import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Button,
  Card,
  /*Tooltip,*/
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Tour from "reactour";
import randomWords from "random-words";
import { FormattedMessage } from "react-intl";

import "./flightConfig.css";

class FlightConfig extends Component {
  state = {
    name: randomWords(3).join("-"),
    selectedSimulator: null,
    selectedStation: null,
    selectedMission: null,
    flightConfig: []
  };
  addToFlight = () => {
    const {
      selectedSimulator,
      selectedStation,
      selectedMission,
      flightConfig
    } = this.state;
    this.setState({
      flightConfig: flightConfig.concat({
        simulatorId: selectedSimulator,
        stationSet: selectedStation,
        missionId: selectedMission
      }),
      selectedSimulator: null,
      selectedStation: null,
      selectedMission: null
    });
  };
  startFlight = () => {
    const { name, flightConfig } = this.state;
    const mutation = gql`
      mutation StartFlight($name: String!, $simulators: [SimulatorInput!]!) {
        startFlight(name: $name, simulators: $simulators)
      }
    `;
    const variables = {
      name,
      simulators: flightConfig
    };
    this.props.client
      .mutate({
        mutation,
        variables
      })
      .then(({ data: { startFlight: flightId } }) => {
        setTimeout(() => {
          this.props.history.push(`/config/flight/${flightId}`);
        }, 500);
      });
  };
  trainingSteps = () => {
    return [
      {
        selector: ".nothing",
        content: (
          <span>
            This is the screen where you configure your flight. A flight in
            Thorium starts with a simulator and, optionally a mission. If you
            haven't imported or created a simulator yet,{" "}
            <Link to="/config/simulator">be sure to do that first</Link>.
          </span>
        )
      },
      {
        selector: ".name-input",
        content: (
          <span>
            You can choose a name for your flight, or use the three-word
            default.
          </span>
        )
      },
      {
        selector: ".simulator-pick",
        content: (
          <span>
            You can see a list of available simulators here. Don't worry - this
            isn't the name of your simulator. These are just template simulators
            which will be stamped out to create the simulator you will use
            during your mission. Click a simulator to add it to the flight
            before moving on.
          </span>
        )
      },
      {
        selector: ".stationset-pick",
        content: (
          <span>
            If you chose a simulator, you should see the station sets here.
            Station sets allow a simulator to have multiple station
            configurations. For example, if I am running a flight with 7 people
            on the simulator, I would want a different station set configuration
            than if I were running with 14 people. This lets you choose a
            different station sets for your flight. Choose a station set before
            moving on.
          </span>
        )
      },
      {
        selector: ".mission-pick",
        content: (
          <span>
            If you chose a station set, you should see a list of missions here
            here. Missions are a pre-defined list of timeline events which
            happen during your flight. You can pick one or click 'Skip' to move
            on. You can always choose a mission for your simulator later. Choose
            a mission or 'Skip' before moving on.
          </span>
        )
      },
      {
        selector: ".current-config",
        content: (
          <span>
            Your current config will appear here. In most cases, you will start
            the flight now. However, it is possible to add additional simulators
            for a joint flight mission. Joint flights take advantage of
            Thorium's shared database to share information between multiple
            simulators. Click 'Start Flight' to initialize the simulator(s) and
            move on.
          </span>
        )
      }
    ];
  };
  render() {
    if (
      this.props.data.loading ||
      !this.props.data.simulators ||
      !this.props.data.missions
    )
      return null;
    const {
      name,
      selectedSimulator,
      selectedStation,
      selectedMission,
      flightConfig
    } = this.state;
    const { simulators, missions } = this.props.data;
    const selectedSimObj =
      simulators.find(s => s.id === selectedSimulator) || {};
    return (
      <Container className="flight-config">
        <h4>
          <FormattedMessage id="flight-config" defaultMessage="Flight Config" />{" "}
          <small>
            <Link to="/">
              <FormattedMessage
                id="return-to-main"
                defaultMessage="Return to Main"
              />
            </Link>
          </small>
        </h4>
        <FormGroup className="name-input">
          <Label>
            Name
            <Input
              type="text"
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </Label>
        </FormGroup>
        <Row>
          <Col sm={3} className="simulator-pick">
            <h5>Pick a simulator</h5>
            <Card className="scroll">
              {simulators.map(s => (
                <li
                  key={s.id}
                  onClick={() =>
                    this.setState({
                      selectedStation: null,
                      selectedSimulator: s.id
                    })
                  }
                  className={`list-group-item ${
                    s.id === selectedSimulator ? "selected" : ""
                  }`}
                >
                  {s.name}
                </li>
              ))}
            </Card>
          </Col>
          <Col sm={3} className="stationset-pick">
            {selectedSimulator && (
              <div>
                <h5>Pick a station set</h5>
                <Card className="scroll">
                  {selectedSimObj.stationSets.map(s => (
                    <TooltipList
                      onClick={() => this.setState({ selectedStation: s.id })}
                      selected={s.id === selectedStation}
                      key={s.id}
                      id={s.id}
                      content={s.name}
                      tooltip={s.stations.map(st => st.name).join(", ")}
                    />
                  ))}
                </Card>
              </div>
            )}
          </Col>
          <Col sm={3} className="mission-pick">
            {selectedStation && (
              <div>
                <h5>Pick a mission</h5>
                <Card className="scroll">
                  {missions.map(m => (
                    <TooltipList
                      onClick={() => this.setState({ selectedMission: m.id })}
                      selected={m.id === selectedMission}
                      key={m.id}
                      id={m.id}
                      content={m.name}
                      tooltip={m.description}
                    />
                  ))}
                </Card>
                {selectedMission ? (
                  <Button
                    size="sm"
                    block
                    color="info"
                    onClick={this.addToFlight}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    block
                    color="primary"
                    onClick={this.addToFlight}
                  >
                    Skip
                  </Button>
                )}
              </div>
            )}
          </Col>
          <Col sm={3} className="current-config">
            {flightConfig.length > 0 && (
              <Fragment>
                <h5>Current Config</h5>
                <Card>
                  {flightConfig.map((f, i) => (
                    <ul key={`flight-config-${i}`}>
                      <li>
                        <strong>Simulator</strong>:{" "}
                        {simulators.find(s => s.id === f.simulatorId).name}
                      </li>
                      <li>
                        <strong>Stations</strong>:{" "}
                        {
                          simulators
                            .find(s => s.id === f.simulatorId)
                            .stationSets.find(s => s.id === f.stationSet).name
                        }
                      </li>
                      {f.missionId && (
                        <li>
                          <strong>Mission</strong>:{" "}
                          {missions.find(m => m.id === f.missionId).name}
                        </li>
                      )}
                    </ul>
                  ))}
                </Card>
                <Button
                  size="lg"
                  block
                  color="success"
                  onClick={this.startFlight}
                >
                  Start Flight
                </Button>
              </Fragment>
            )}
          </Col>
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

class TooltipList extends Component {
  state = { tooltipOpen: false };
  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };
  render() {
    // const { tooltipOpen } = this.state;
    const { content, /*tooltip,*/ id, selected, onClick } = this.props;
    return (
      <li
        id={id}
        onClick={onClick}
        className={`list-group-item ${selected ? "selected" : ""}`}
      >
        <span>{content}</span>
        {/*<Tooltip
          placement="right"
          isOpen={tooltipOpen}
          target={id}
          toggle={this.toggle}
        >
          {tooltip}
        </Tooltip>*/}
      </li>
    );
  }
}
const FLIGHT_QUERY = gql`
  query FlightSetup {
    simulators(template: true) {
      id
      name
      stationSets {
        id
        name
        stations {
          name
        }
      }
    }
    missions {
      id
      name
      description
    }
  }
`;

export default graphql(FLIGHT_QUERY)(withApollo(FlightConfig));
