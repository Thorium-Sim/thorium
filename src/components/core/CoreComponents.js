import React, { Component } from "react";
import * as Layouts from "./layouts";
import { withApollo, graphql } from "react-apollo";
import gql from "graphql-tag";
import IssueTracker from "../../components/admin/IssueTracker";
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
import { Link } from "react-router";

import "./CoreComponents.scss";

class CoreComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simulator: null,
      layout: localStorage.getItem("thorium_coreLayout") || "defaultLayout",
      editable: false,
      issuesOpen: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      const { flights } = nextProps.data;
      if (flights) {
        const flight = this.props.flightId
          ? flights.find(f => f.id === this.props.flightId)
          : {};
        const simulators = flight && flight.id ? flight.simulators : [];
        if (simulators.length === 1) {
          this.pickSimulator({
            target: { value: simulators[0].id }
          });
        }
        if (
          simulators.indexOf(
            s => s.id === localStorage.getItem("thorium_coreSimulator")
          ) > -1
        ) {
          this.pickSimulator({
            target: { value: localStorage.getItem("thorium_coreSimulator") }
          });
          return;
        }
      }
    }
  }
  pickSimulator = (e, done) => {
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
  toggleIssueTracker = () => {
    this.setState({
      issuesOpen: !this.state.issuesOpen
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const { flights } = this.props.data;
    const flight = this.props.flightId
      ? flights.find(f => f.id === this.props.flightId)
      : {};
    const simulators = flight && flight.id ? flight.simulators : [];
    const LayoutComponent = Layouts[this.state.layout];

    return (
      <div className="core">
        <select
          className="btn btn-info btn-sm"
          onChange={this.pickSimulator.bind(this)}
          value={this.state.simulator || ""}
        >
          <option>Pick a simulator</option>
          <option disabled>⸺⸺⸺⸺⸺</option>
          <option value="test">Test</option>
          {simulators.map(s =>
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          )}
        </select>
        <select
          className="btn btn-primary btn-sm"
          onChange={this.pickLayout}
          value={this.state.layout}
        >
          <option>Pick a layout</option>
          <option disabled>⸺⸺⸺⸺⸺</option>
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
        <Link to={`/flight/${this.props.flightId}`}>Client Config</Link>
        <a
          href="#"
          onClick={this.toggleIssueTracker}
          style={{ marginLeft: "20px" }}
        >
          Bug Report/Issue Tracker
        </a>
        <div
          id="core-layout"
          style={{
            display: this.state.simulator ? "block" : "none",
            height: "calc(100vh - 26px)"
          }}
        >
          {LayoutComponent &&
            this.state.simulator &&
            <LayoutComponent
              {...this.props}
              simulator={{ id: this.state.simulator }}
            />}
        </div>
        {!this.state.simulator &&
          <ListGroup style={{ maxWidth: "500px" }}>
            {simulators.map(s =>
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
            )}
          </ListGroup>}
        <Modal isOpen={this.state.issuesOpen} toggle={this.toggleIssueTracker}>
          <ModalHeader toggle={this.toggleIssueTracker}>
            Submit a Feature/Bug Report
          </ModalHeader>
          <ModalBody>
            <IssueTracker />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleIssueTracker}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        {this.state.simulator &&
          <Alerts
            ref="alert-widget"
            simulator={{ id: this.state.simulator }}
            station={{ name: "Core" }}
          />}
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
      simulators {
        id
        name
      }
    }
  }
`;
export default graphql(CORE_LAYOUT, {
  options: ownProps => ({
    variables: {
      id: ownProps.flightId
    }
  })
})(withApollo(CoreComponents));
