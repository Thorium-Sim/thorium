import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import {
  Container,
  Label,
  Row,
  Col,
  Input,
  Button,
  ButtonGroup
} from "reactstrap";
import Preview, { Viewscreen } from "./index";
import * as ViewscreenCards from "../../viewscreens";

import "./style.scss";

const CardPreview = Viewscreen;

const VIEWSCREEN_SUB = gql`
  subscription ViewscreenSub($simulatorId: ID) {
    viewscreensUpdate(simulatorId: $simulatorId) {
      id
      name
      component
    }
  }
`;

class ViewscreenCore extends Component {
  sub = null;
  cards = Object.keys(ViewscreenCards).sort();
  state = {
    selectedViewscreen: null,
    preview: true
  };
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: VIEWSCREEN_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            viewscreens: subscriptionData.data.viewscreensUpdate
          });
        }
      });
    }
    if (!nextProps.data.loading) {
      const { viewscreens } = nextProps.data;
      if (viewscreens.length === 1) {
        this.setState({
          selectedViewscreen: viewscreens[0].id
        });
      }
    }
  }
  updateCard = component => {
    const mutation = gql`
      mutation UpdateViewscreen($id: ID!, $component: String!) {
        updateViewscreenComponent(id: $id, component: $component)
      }
    `;
    const variables = {
      id: this.state.selectedViewscreen,
      component
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const { viewscreens } = this.props.data;
    const { selectedViewscreen = null, preview, previewComponent } = this.state;
    if (!viewscreens) return <div>No Viewscreens</div>;
    return (
      <Container fluid className="viewscreen-core">
        <div className="q1">
          {selectedViewscreen &&
            <Preview
              simulator={this.props.simulator}
              clientObj={{ id: selectedViewscreen }}
            />}
        </div>
        <div className="q3">
          {previewComponent &&
            <CardPreview
              simulator={this.props.simulator}
              component={previewComponent}
            />}
        </div>
        <div className="q2">
          <Row>
            <Col sm={6}>
              <Label>Viewscreen</Label>
              <Input
                type="select"
                size="sm"
                value={selectedViewscreen || "select"}
                onChange={evt => {
                  this.setState({ selectedViewscreen: evt.target.value });
                }}
              >
                <option value="select">Select a viewscreen</option>
                {viewscreens.map(v =>
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                )}
              </Input>
            </Col>
            <Col sm={6}>
              <Label>Cards</Label>
              <div className="card-list">
                {this.cards.map(c =>
                  <p
                    key={c}
                    className={`${selectedViewscreen &&
                    viewscreens.find(v => v.id === selectedViewscreen)
                      .component === c
                      ? "previewing"
                      : ""} ${previewComponent === c ? "selected" : ""}`}
                    onClick={() =>
                      preview
                        ? this.setState({ previewComponent: c })
                        : this.updateCard(c)}
                  >
                    {c}
                  </p>
                )}
              </div>
              <ButtonGroup>
                <Button
                  color="primary"
                  className={preview ? "active" : ""}
                  onClick={() => this.setState({ preview: true })}
                >
                  Preview
                </Button>
                <Button
                  color="info"
                  onClick={() => this.updateCard(previewComponent)}
                >
                  Go
                </Button>
                <Button
                  color="success"
                  className={!preview ? "active" : ""}
                  onClick={() => this.setState({ preview: false })}
                >
                  Change
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </div>
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
})(withApollo(ViewscreenCore));
