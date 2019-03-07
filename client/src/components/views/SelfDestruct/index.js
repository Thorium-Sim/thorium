import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Container, Row, Col, Button, Input } from "reactstrap";
import { Duration } from "luxon";
import { graphql, withApollo, Mutation } from "react-apollo";
import Tour from "helpers/tourHelper";
import SubscriptionHelper from "helpers/subscriptionHelper";

import "./style.scss";

function padDigits(number, digits) {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
}

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

const trainingSteps = [
  {
    selector: ".self-destruct-button",
    content:
      "Only use this as your last possible option. The self-destruct will overload the main reactor, causing it to explode. The ship will be destroyed and your crew will be dead."
  },
  {
    selector: ".self-destruct-button",
    content:
      "Click this button to activate and deactivate the self destruct. You have the option to set a time on the self destruct in Hour:Minute:Second format. Give yourself enough time ."
  }
];
class SelfDestruct extends Component {
  state = {
    modal: false
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      setCode: false
    });
  };
  activate = (time, force) => {
    const sim = this.props.data.simulators[0];
    if (sim.ship.selfDestructTime && sim.ship.selfDestructCode && !force) {
      return this.setState({
        modal: false,
        deactivating: true,
        deactivateCode: ""
      });
    }
    const mutation = gql`
      mutation ActivateSelfDestruct($id: ID!, $time: Float) {
        setSelfDestructTime(simulatorId: $id, time: $time)
      }
    `;
    const variables = {
      id: sim.id,
      time: sim.ship.selfDestructTime ? null : time
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      modal: false,
      deactivating: false,
      deactivateCode: ""
    });
  };
  setCode = code => {
    const mutation = gql`
      mutation SetSelfDestructCode($id: ID!, $code: String) {
        setSelfDestructCode(simulatorId: $id, code: $code)
      }
    `;
    const sim = this.props.data.simulators[0];
    const variables = {
      id: sim.id,
      code
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({ modal: false, setCode: false });
  };
  openCodeModal = () => {
    this.setState({ modal: true, setCode: true });
  };
  render() {
    if (this.props.data.loading || !this.props.data.simulators) return null;
    const {
      modal,
      setCode,
      settingCode,
      password,
      passwordVerify,
      deactivating,
      deactivateCode
    } = this.state;
    if (!this.props.data.simulators) return null;
    const {
      selfDestructTime,
      selfDestructCode
    } = this.props.data.simulators[0].ship;
    const duration = Duration.fromObject({
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: selfDestructTime
    }).normalize();
    return (
      <Container className="self-destruct">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: SELF_DESTRUCT_SUB,
              variables: {
                id: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  simulators: subscriptionData.data.simulatorsUpdate
                });
              }
            })
          }
        />
        {modal ? (
          <SelfDestructModal
            modal={modal}
            toggle={this.toggle}
            activate={this.activate}
            code={selfDestructCode}
            setCode={setCode}
            setCodeFunc={this.setCode}
          />
        ) : deactivating ? (
          <Row>
            <Col sm={{ offset: 3, size: 6 }}>
              <h3>Enter Self-Destruct Code:</h3>
              <Input
                type="text"
                className="txtPassword"
                value={deactivateCode}
                disabled={deactivateCode === selfDestructCode}
                onChange={evt =>
                  this.setState({ deactivateCode: evt.target.value }, () => {
                    if (this.state.deactivateCode === selfDestructCode) {
                      this.activate(null, true);
                    }
                  })
                }
              />
            </Col>
          </Row>
        ) : (
          <div className={`holder  ${selfDestructTime ? "on" : ""}`}>
            <div
              className="self-destruct-button"
              onClick={selfDestructTime ? this.activate : this.toggle}
            >
              {selfDestructTime ? "Deactivate" : "Activate"} Self-Destruct
            </div>
          </div>
        )}
        {selfDestructTime && selfDestructTime > 0 ? (
          <div className="counter">
            {`${padDigits(duration.hours, 2)}:${padDigits(
              duration.minutes,
              2
            )}:${padDigits(duration.seconds, 2)}`}
          </div>
        ) : settingCode ? (
          <Row>
            <Col sm={12}>
              <h3>Enter Self-Destruct Code</h3>
            </Col>
            <Col sm={6}>
              <Input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Col>
            <Col sm={6}>
              <Input
                type="password"
                placeholder="Verify Password"
                value={passwordVerify}
                onChange={e =>
                  this.setState({ passwordVerify: e.target.value })
                }
              />
            </Col>
            <Col sm={6}>
              <Button
                color="danger"
                block
                onClick={() =>
                  this.setState({
                    password: "",
                    passwordVerify: "",
                    settingCode: false
                  })
                }
              >
                Cancel
              </Button>
            </Col>
            <Col sm={6}>
              <Mutation
                mutation={gql`
                  mutation SelfDestructCode($simulatorId: ID!, $code: String!) {
                    setSelfDestructCode(simulatorId: $simulatorId, code: $code)
                  }
                `}
                variables={{
                  simulatorId: this.props.simulator.id,
                  code: this.state.password
                }}
              >
                {action => (
                  <Button
                    color="success"
                    block
                    disabled={
                      !password ||
                      !passwordVerify ||
                      password !== passwordVerify
                    }
                    onClick={() => {
                      action();
                      this.setState({ settingCode: false });
                    }}
                  >
                    Set Code
                  </Button>
                )}
              </Mutation>
            </Col>
          </Row>
        ) : (
          <div className="set-code">
            <Button
              block
              color="warning"
              size="lg"
              onClick={() => this.setState({ settingCode: true })}
            >
              Set Self-Destruct Code
            </Button>
          </div>
        )}

        <Tour steps={trainingSteps} client={this.props.clientObj} />
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
    fetchPolicy: "cache-and-network",
    variables: {
      id: ownProps.simulator.id
    }
  })
})(withApollo(SelfDestruct));

class SelfDestructModal extends Component {
  state = {};
  render() {
    const { toggle, activate, code, setCode, setCodeFunc } = this.props;
    const { inputCode, hours = 0, minutes = 0, seconds = 0 } = this.state;
    const time = hours * 1000 * 60 * 60 + minutes * 1000 * 60 + seconds * 1000;
    return (
      <Col sm={{ size: 6, offset: 3 }}>
        <Row style={{ margin: "30px 0" }}>
          <Col sm={12}>
            <h1>
              {setCode ? "Set Self-Destruct Code" : "Activate Self-Destruct"}
            </h1>
          </Col>
          {(setCode || (code ? code !== inputCode : true)) && (
            <Col sm={12}>
              {code && (
                <div>
                  <h3>Enter Self-Destruct Code:</h3>
                  <Input
                    type="text"
                    className="txtPassword"
                    value={inputCode}
                    disabled={inputCode === code}
                    onChange={evt =>
                      this.setState({ inputCode: evt.target.value })
                    }
                  />
                </div>
              )}
            </Col>
          )}
          <Col sm={12}>
            {!setCode && (code ? code === inputCode : true) && (
              <div>
                <h3>Enter Countdown Time:</h3>
                <div className="countdown-input">
                  <Input
                    type="text"
                    value={hours}
                    onChange={evt => this.setState({ hours: evt.target.value })}
                    maxLength={2}
                  />
                  <span className="divider">:</span>
                  <Input
                    type="text"
                    value={minutes}
                    onChange={evt =>
                      this.setState({ minutes: evt.target.value })
                    }
                    maxLength={2}
                  />
                  <span className="divider">:</span>
                  <Input
                    type="text"
                    value={seconds}
                    onChange={evt =>
                      this.setState({ seconds: evt.target.value })
                    }
                    maxLength={2}
                  />
                </div>
              </div>
            )}
          </Col>
          <Col sm={6}>
            <Button color="secondary" size="lg" block onClick={toggle}>
              Cancel
            </Button>
          </Col>
          <Col sm={6}>
            <Button
              color="danger"
              size="lg"
              block
              disabled={
                !setCode && !((code ? code === inputCode : true) && time)
              }
              onClick={
                setCode ? () => setCodeFunc(inputCode) : () => activate(time)
              }
            >
              {setCode ? "Set Code" : "Activate"}
            </Button>
          </Col>
        </Row>
      </Col>
    );
  }
}
