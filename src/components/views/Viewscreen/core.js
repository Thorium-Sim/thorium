import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input } from "reactstrap";
import * as ViewscreenCards from "../../viewscreens";

import "./style.css";

const VIEWSCREEN_SUB = gql`
  subscription ViewscreenSub($simulatorId: ID) {
    viewscreensUpdate(simulatorId: $simulatorId) {
      id
      name
      component
    }
  }
`;

class Viewscreen extends Component {
  sub = null;
  state = {
    selectedViewscreen: null
  };
  componentWillUnmount() {
    this.sub && this.sub();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: VIEWSCREEN_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            viewscreens: subscriptionData.viewscreensUpdate
          });
        }
      });
    }
  }
  updateCard = evt => {
    const mutation = gql`
      mutation UpdateViewscreen($id: ID!, $component: String!) {
        updateViewscreenComponent(id: $id, component: $component)
      }
    `;
    const variables = {
      id: this.state.selectedViewscreen,
      component: evt.target.value
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.viewscreens) return null;
    const { viewscreens } = this.props.data;
    const { selectedViewscreen = null } = this.state;
    if (!viewscreens) return <div>No Viewscreens</div>;
    return (
      <Container className="viewscreen-core">
        <Row>
          <Col sm={6}>
            <Input
              type="select"
              size="sm"
              value={selectedViewscreen || "select"}
              onChange={evt => {
                this.setState({ selectedViewscreen: evt.target.value });
              }}
            >
              <option value="select">Select a viewscreen</option>
              {viewscreens.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </Input>
          </Col>
          <Col sm={6}>
            <Input
              type="select"
              disabled={!selectedViewscreen}
              size="sm"
              value={
                selectedViewscreen
                  ? viewscreens.find(v => v.id === selectedViewscreen).component
                  : "select"
              }
              onChange={this.updateCard}
            >
              <option value="select" disabled>
                Select a card
              </option>
              {Object.keys(ViewscreenCards).map(v => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
      </Container>
    );
  }
}

const VIEWSCREEN_QUERY = gql`
  query Viewscreens($simulatorId: ID) {
    viewscreens(simulatorId: $simulatorId) {
      id
      name
      component
    }
  }
`;
export default graphql(VIEWSCREEN_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Viewscreen));
