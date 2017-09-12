import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Card, CardBlock } from "reactstrap";
import { Asset } from "../../../helpers/assets";
import Decompress from "./Decompress";
import Door from "./Door";
import "./style.scss";

const SHUTTLE_SUB = gql`
  subscription ShuttlesUpdate($simulatorId: ID) {
    dockingUpdate(simulatorId: $simulatorId, type: shuttlebay) {
      id
      name
      clamps
      ramps
      doors
      image
      docked
      damage {
        damaged
      }
    }
  }
`;

class Shuttles extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: SHUTTLE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            docking: subscriptionData.data.dockingUpdate
          });
        }
      });
    }
  }
  render() {
    if (this.props.data.loading) return null;
    const { docking } = this.props.data;
    return (
      <Container className="shuttles-card">
        {
          <Row>
            {docking.map(d =>
              <Col sm={3} key={d.id}>
                <ShuttleBay {...d} simulatorId={this.props.simulator.id} />
              </Col>
            )}
            {docking.map(d =>
              <Col sm={3} key={d.id}>
                <ShuttleBay {...d} simulatorId={this.props.simulator.id} />
              </Col>
            )}
          </Row>
        }
        <Row>
          <Col sm={4}>
            <Door />
          </Col>
          <Col sm={4}>
            <Decompress />
          </Col>
        </Row>
      </Container>
    );
  }
}

const ShuttleBay = ({ docked, image, name, simulatorId }) => {
  return (
    <Card>
      <CardBlock>
        <h3 className="text-center">
          {name}
        </h3>
        <div className="shuttle">
          {docked &&
            <Asset asset={image} simulatorId={simulatorId}>
              {({ src }) => <img className="picture" src={src} />}
            </Asset>}
        </div>
      </CardBlock>
    </Card>
  );
};

const SHUTTLE_QUERY = gql`
  query Shuttles($simulatorId: ID) {
    docking(simulatorId: $simulatorId, type: shuttlebay) {
      id
      name
      clamps
      ramps
      doors
      image
      docked
      damage {
        damaged
      }
    }
  }
`;
export default graphql(SHUTTLE_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(Shuttles));
