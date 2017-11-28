import React, { Component } from "react";
import gql from "graphql-tag";
import { Row, Col, Container } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import Isochips from "./isochips";
import Battery from "./batteryCharging";
import Routing from "./powerRouting";
import "./style.css";

const Components = [Isochips, Battery, Routing];

const SYSTEMS_SUB = gql`
  subscription SystemsUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId) {
      name
      displayName
      type
      id
      damage {
        damaged
      }
    }
  }
`;

class JrEng extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systems: [],
      repairSystem: null,
      repairComponent: null
    };
    this.systemSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && !this.state.sysId) {
      this.setState({
        systems: nextProps.data.systems
      });
    }
    if (!this.systemSub && !nextProps.data.loading) {
      this.systemSub = nextProps.data.subscribeToMore({
        document: SYSTEMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            systems: subscriptionData.systemsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.systemSub();
  }
  selectSystem = system => {
    this.setState({
      repairSystem: system,
      repairComponent: Object.keys(Components)[
        Math.round(Math.random() * (Components.length - 1))
      ]
    });
  };
  complete = () => {
    const mutation = gql`
      mutation SendReactivationCode(
        $systemId: ID!
        $station: String!
        $code: String!
      ) {
        systemReactivationCode(
          systemId: $systemId
          station: $station
          code: $code
        )
      }
    `;
    const variables = {
      systemId: this.state.repairSystem,
      code: "Jr. Controls",
      station: this.props.station.name
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      repairSystem: null,
      repairComponent: null
    });
  };
  render() {
    if (this.props.data.loading) return null;
    if (this.state.repairSystem) {
      const Comp = Components[this.state.repairComponent];
      return (
        <Container fluid className="jr-eng">
          <Row>
            <Comp complete={this.complete} />
          </Row>
        </Container>
      );
    }
    return (
      <Container className="jr-eng">
        <Row>
          {this.state.systems
            .slice(0)
            .sort((a, b) => {
              if (a.type > b.type) return 1;
              if (a.type < b.type) return -1;
              return 0;
            })
            .filter(s => s.name || s.displayName)
            .map(sys => (
              <Col key={sys.id} sm={6}>
                <h1
                  className={sys.damage.damaged ? "text-danger" : ""}
                  onClick={
                    sys.damage.damaged
                      ? () => this.selectSystem(sys.id)
                      : () => {}
                  }
                >
                  {sys.displayName || sys.name}
                </h1>
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}

const SYSTEMS_QUERY = gql`
  query Systems($simulatorId: ID) {
    systems(simulatorId: $simulatorId) {
      name
      displayName
      type
      id
      damage {
        damaged
      }
    }
  }
`;

export default graphql(SYSTEMS_QUERY, {
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(JrEng));
