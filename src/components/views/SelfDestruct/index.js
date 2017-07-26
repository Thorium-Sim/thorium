import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Col } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";
import "./style.scss";

const SELF_DESTRUCT_SUB = gql`
  subscription SelfDestructUpdate($id: ID) {
    simulatorsUpdate(simulatorId: $id) {
      id
      ship {
        selfDestructTime
        selfDestructCode
      }
    }
  }
`;

class SelfDestruct extends Component {
  constructor(props) {
    super(props);
    this.internalSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: SELF_DESTRUCT_SUB,
        variables: {
          id: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({ simulators: subscriptionData.data.simulatorsUpdate })
            .toJS();
        }
      });
    }
  }
  render() {
    return (
      <Container className="self-destruct">
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <div className="self-destruct-button">Activate Self-Destruct</div>
            <div className="spacer" />
          </Col>
        </Row>
      </Container>
    );
  }
}

const SELF_DESTRUCT_QUERY = gql`
  query SelfDestruct($id: String) {
    simulators(id: $id) {
      id
      ship {
        selfDestructTime
        selfDestructCode
      }
    }
  }
`;
export default graphql(SELF_DESTRUCT_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.simulator.id
    }
  })
})(withApollo(SelfDestruct));
