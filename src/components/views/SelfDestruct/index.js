import React, { Component } from "react";
import gql from "graphql-tag";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "reactstrap";

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
  sub = null;
  state = {
    modal: false
  };
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
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
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  activate = (time) => {
    const mutation = gql`
      mutation ActivateSelfDestruct($id: ID!, $time: Float) {
        setSelfDestructTime(simulatorId: $id, time: $time)
      }
    `;
    const sim = this.props.data.simulators[0];
    const variables = {
      id: sim.id,
      time: sim.ship.selfDestructTime ? null : time
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    const { modal } = this.state;
    const {
      selfDestructTime,
      selfDestructCode
    } = this.props.data.simulators[0].ship;
    return (
      <Container className="self-destruct">
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <div className="holder">
              <div className="self-destruct-button" onClick={this.toggle}>
                {selfDestructTime ? "Deactivate" : "Activate"} Self-Destruct
              </div>
            </div>
            <div className="spacer" />
            <div className="counter">
              {selfDestructTime}
            </div>
            <SelfDestructModal
              modal={modal}
              toggle={this.modal}
              activate={this.activate}
              code={selfDestructCode}
            />
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

class SelfDestructModal extends Component {
  state = {}
  render() {
    const { modal, toggle, activate, code } = this.props;
    const { inputCode, time } = this.state;
    console.log(this.state);
    return (
      <Modal className="modal-themed" isOpen={modal} toggle={toggle} size="large">
        <ModalHeader toggle={toggle}>Activate Self-Destruct</ModalHeader>
        <ModalBody>
          {code &&
            <div>
              <h3>Enter Self-Destruct Code:</h3>
              <Input
                type="text"
                value={inputCode}
                disabled={inputCode === code}
                onChange={evt => this.setState({ inputCode: evt.target.value })}
              />
            </div>}
          {(code ? code === inputCode : true) &&
            <div>
              <h3>Enter Countdown Time:</h3>
              <Input
                type="number"
                value={time}
                onChange={evt => this.setState({ time: evt.target.value })}
              />
            </div>}
        </ModalBody>
        <ModalFooter>
          <Col sm={3}>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          </Col>
          <Col sm={3}>
          <Button
            color="danger"
            disabled={!((code ? code === inputCode : true) && time)}
            onClick={() => activate(time)}
          >
            Activate
          </Button>
          </Col>
        </ModalFooter>
      </Modal>
    );
  }
}
