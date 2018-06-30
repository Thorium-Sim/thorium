import React, { Component } from "react";
import * as Layouts from "./layouts";
import { withApollo, graphql } from "react-apollo";
import gql from "graphql-tag";
import IssueTracker from "../../components/admin/IssueTracker";
import { publish } from "../views/helpers/pubsub";
import Hotkey from "./hotkey";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import Alerts from "../generic/Alerts";
import { Link } from "react-router-dom";
import DynamicPicker from "./DynamicPicker";

import "./CoreComponents.scss";

const FLIGHTS_SUB = gql`
  subscription FlightsSub($id: ID) {
    flightsUpdate(id: $id) {
      id
      name
      date
      running
      simulators {
        id
        name
        layout
        stations {
          name
        }
      }
    }
  }
`;

const CACHE_INVALID_SUB = gql`
  subscription ClearCache($flight: ID!) {
    clearCache(flight: $flight)
  }
`;

class CoreComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulator: null,
      layout: localStorage.getItem("thorium_coreLayout") || "defaultLayout",
      mosaic: JSON.parse(localStorage.getItem("thorium_coreMosaic")) || null,
      notifications:
        localStorage.getItem("thorium_coreNotifications") === "true",
      speech: localStorage.getItem("thorium_coreSpeech") === "true",
      editable: false,
      issuesOpen: false
    };
    this.flightsSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.flightsSub && !nextProps.data.loading) {
      this.flightsSub = nextProps.data.subscribeToMore({
        document: FLIGHTS_SUB,
        variables: { id: this.props.flightId },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            flights: subscriptionData.data.flightsUpdate
          });
        }
      });
    }
    if (!this.cacheSub && !nextProps.data.loading) {
      this.cacheSub = nextProps.data.subscribeToMore({
        document: CACHE_INVALID_SUB,
        variables: { flight: this.props.flightId },
        updateQuery: previousResult => {
          window.location.reload();
          return previousResult;
        }
      });
    }
    if (!nextProps.data.loading) {
      const { flights } = nextProps.data;
      if (flights) {
        const flight = this.props.flightId
          ? flights.find(f => f.id === this.props.flightId)
          : {};
        const simulators = flight && flight.id ? flight.simulators : [];
        if (simulators.length === 1) {
          this.setState({
            simulator: simulators[0].id
          });
          localStorage.setItem("thorium_coreSimulator", simulators[0].id);
        }
        if (
          simulators.indexOf(
            s => s.id === localStorage.getItem("thorium_coreSimulator")
          ) > -1
        ) {
          this.setState({
            simulator: localStorage.getItem("thorium_coreSimulator")
          });
          return;
        }
        if (simulators.length === 0) {
          this.setState({
            simulator: "test"
          });
        }
      }
    }
  }
  componentWillUnmount() {
    this.flightsSub && this.flightsSub();
    this.cacheSub && this.cacheSub();
  }
  pickSimulator = e => {
    const simulator = e.target.value;
    this.setState({
      simulator
    });
    localStorage.setItem("thorium_coreSimulator", simulator);
  };
  pickLayout = e => {
    this.setState({
      layout: e.target.value
    });
    localStorage.setItem("thorium_coreLayout", e.target.value);
  };
  updateMosaic = mosaic => {
    this.setState({
      mosaic
    });
    localStorage.setItem("thorium_coreMosaic", JSON.stringify(mosaic));
  };
  toggleIssueTracker = () => {
    this.setState({
      issuesOpen: !this.state.issuesOpen
    });
  };
  render() {
    if (this.props.data.loading) return null;

    const {
      data: { flights },
      flightId,
      history
    } = this.props;
    if (
      !flights ||
      (flights.map(f => f.id).indexOf(flightId) === -1 && flightId !== "c")
    ) {
      history.push("/");
      return null;
    }
    if (!flights) return null;
    const flight = this.props.flightId
      ? flights.find(f => f.id === this.props.flightId)
      : {};
    const simulators = flight && flight.id ? flight.simulators : [];
    const LayoutComponent = Layouts[this.state.layout];
    const { notifications, speech, mosaic } = this.state;
    return (
      <div
        style={{ backgroundColor: "#333", color: "white" }}
        className="core-container"
      >
        <Button
          tag={Link}
          size="sm"
          to={`/config/flight/${this.props.flightId}`}
        >
          {"<-"} Client Config
        </Button>

        {simulators.length > 1 && (
          <select
            className="btn btn-info btn-sm"
            onChange={this.pickSimulator.bind(this)}
            value={this.state.simulator || ""}
          >
            <option>Pick a simulator</option>
            <option disabled />
            {process.env.NODE_ENV !== "production" && (
              <option value="test">Test</option>
            )}
            {simulators.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}
        <select
          className="btn btn-primary btn-sm"
          onChange={this.pickLayout}
          value={this.state.layout}
        >
          <option>Pick a layout</option>
          <option disabled />
          {Object.keys(Layouts)
            .filter(function(item, index, a) {
              return a.indexOf(item) === index;
            })
            .map(l => {
              return (
                <option key={l} value={l}>
                  {l}
                </option>
              );
            })}
        </select>
        {["Dynamic", "Next"].indexOf(this.state.layout) > -1 && (
          <DynamicPicker
            mosaic={mosaic}
            onChange={m => this.setState({ mosaic: m })}
          />
        )}
        <Button
          size="sm"
          onClick={this.toggleIssueTracker}
          style={{ marginLeft: "20px" }}
        >
          Bug Report/Issue Tracker
        </Button>
        <label>
          Notifications{" "}
          <input
            type="checkbox"
            checked={notifications}
            onChange={e => {
              this.setState({ notifications: e.target.checked });
              localStorage.setItem(
                "thorium_coreNotifications",
                e.target.checked
              );
            }}
          />
        </label>
        <label>
          Speech{" "}
          <input
            type="checkbox"
            checked={speech}
            onChange={e => {
              this.setState({ speech: e.target.checked });
              localStorage.setItem("thorium_coreSpeech", e.target.checked);
            }}
          />
        </label>
        <Button
          onClick={() => publish("clearNotifications")}
          size="sm"
          color="info"
          style={{ float: "right", marginRight: "50px" }}
        >
          Clear all notifications
        </Button>
        <div
          id="core-layout"
          style={{
            display: this.state.simulator ? "block" : "none",
            height: "calc(100vh - 26px)"
          }}
        >
          {LayoutComponent &&
            this.state.simulator && (
              <LayoutComponent
                {...this.props}
                mosaic={mosaic}
                updateMosaic={this.updateMosaic}
                simulator={
                  simulators.find(s => s.id === this.state.simulator) || {
                    id: this.state.simulator
                  }
                }
              />
            )}
        </div>
        {!this.state.simulator && (
          <ListGroup style={{ maxWidth: "500px" }}>
            {simulators.map(s => (
              <ListGroupItem
                onClick={() => this.pickSimulator({ target: { value: s.id } })}
                key={s.id}
                style={{
                  color: "black",
                  fontSize: "24px"
                }}
              >
                {s.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
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
        {this.state.simulator && (
          <Alerts
            ref="alert-widget"
            disabled={!notifications}
            speech={speech}
            simulator={{ id: this.state.simulator }}
            station={{ name: "Core" }}
          />
        )}
        <Hotkey
          {...this.props}
          simulator={
            simulators.find(s => s.id === this.state.simulator) || {
              id: this.state.simulator
            }
          }
        />
      </div>
    );
  }
}

const CORE_LAYOUT = gql`
  query Flights($id: ID) {
    flights(id: $id) {
      id
      name
      date
      running
      simulators {
        id
        name
        layout
        stations {
          name
        }
      }
    }
  }
`;
export default graphql(CORE_LAYOUT, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      id: ownProps.flightId
    }
  })
})(withApollo(CoreComponents));
