import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import Immutable from "immutable";
import FontAwesome from "react-fontawesome";

import "./style.scss";

const TIMELINE_SUB = gql`
  subscription TimelineSub($missionId: ID) {
    missionsUpdate(missionId: $missionId) {
      id
      name
      description
      timeline {
        id
        name
        order
        description
        timelineItems {
          id
          name
          type
          args
          event
          delay
        }
      }
    }
  }
`;

class InternalComm extends Component {
  constructor(props) {
    super(props);
    this.internalSub = null;
  }
  componentWillReceiveProps(nextProps) {
    return; // Don't deal with subscriptions now.
    /*if (!this.internalSub && !nextProps.data.loading) {
      const mission = nextProps.data.simulators[0].mission;
      if (!mission) return;
      this.internalSub = nextProps.data.subscribeToMore({
        document: TIMELINE_SUB,
        variables: {
          missionId: mission.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ longRangeCommunications: subscriptionData.data.longRangeCommunicationsUpdate }).toJS();
        }
      });
    }*/
  }
  render() {
    if (this.props.data.loading) return null;
    const { mission } = this.props.data.simulators[0];
    return (
      <Container className="core-timeline">
        <Row>
          <Col>
            <h4>
              {mission.name}
            </h4>
            <ButtonGroup size="sm">
              <Button color="primary" title="Go Back">
                <FontAwesome fixedWidth name="arrow-left" />
              </Button>
              <Button color="warning" title="Run Step">
                <FontAwesome fixedWidth name="step-forward" />
              </Button>
              <Button color="success" title="Run & Go Forward">
                <FontAwesome fixedWidth name="play" />
              </Button>
              <Button color="primary" title="Go Forward">
                <FontAwesome fixedWidth name="arrow-right" />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          {mission.timeline.map(t =>
            <Col key={t.id}>
              <h5>
                {t.name}
              </h5>
              <p>
                {t.description}
              </p>
              <ul>
                {t.timelineItems.map(i =>
                  <li key={i.id}>
                    <input type="checkbox" /> {i.name}
                    <details>
                      <summary>Details</summary>
                      <p>
                        {i.event}
                      </p>
                      <pre>
                        {i.args}
                      </pre>
                    </details>
                  </li>
                )}
              </ul>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const INTERNAL_QUERY = gql`
  query Timeline($simulatorId: String) {
    simulators(id: $simulatorId) {
      mission {
        id
        name
        description
        timeline {
          id
          name
          order
          description
          timelineItems {
            id
            name
            type
            args
            event
            delay
          }
        }
      }
    }
  }
`;
export default graphql(INTERNAL_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(InternalComm));
