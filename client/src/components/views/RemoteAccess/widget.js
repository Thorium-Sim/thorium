import React, { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import { Button, Row, Col, Container, Input } from "reactstrap";

class MessageComposer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }
  sendCode() {
    const mutation = gql`
      mutation RemoteAccessCode(
        $simulatorId: ID!
        $code: String!
        $station: String!
      ) {
        remoteAccessSendCode(
          simulatorId: $simulatorId
          code: $code
          station: $station
        )
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      station: this.props.station.name,
      code: this.state.code
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.props.toggle();
  }
  render() {
    return (
      <Container fluid>
        <Row className="remote-access">
          <Col sm={8}>
            <Input
              value={this.state.code}
              onChange={e => {
                this.setState({ code: e.target.value });
              }}
              type="text"
              placeholder="Enter code here:"
            />
          </Col>
          <Col sm={4}>
            <Button
              block
              onClick={this.sendCode.bind(this)}
              disabled={this.state.code.length === 0}
              color="success"
            >
              Send Code
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withApollo(MessageComposer);
