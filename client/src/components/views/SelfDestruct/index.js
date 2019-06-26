import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Container, Row, Col, Button, Input } from "helpers/reactstrap";
import { Duration } from "luxon";
import { withApollo, Mutation } from "react-apollo";
import Tour from "helpers/tourHelper";
import { useQuery } from "@apollo/react-hooks";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";

import "./style.scss";

function padDigits(number, digits) {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
}

const SELF_DESTRUCT_SUB = gql`
  subscription SelfDestructUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
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
const SELF_DESTRUCT_QUERY = gql`
  query SelfDestruct($simulatorId: ID) {
    simulators(id: $simulatorId) {
      id
      ship {
        selfDestructTime
        selfDestructCode
      }
    }
  }
`;
const SelfDestruct = ({ simulator, client, clientObj }) => {
  const [modal, setModal] = React.useState(false);
  const [setCode, setSetCode] = React.useState(false);
  const [deactivating, setDeactivating] = React.useState(false);
  const [deactivateCode, setDeactivateCode] = React.useState(false);
  const [settingCode, setSettingCode] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [passwordVerify, setPasswordVerify] = React.useState(null);
  const { loading, data, subscribeToMore } = useQuery(SELF_DESTRUCT_QUERY, {
    variables: { simulatorId: simulator.id }
  });
  useSubscribeToMore(subscribeToMore, SELF_DESTRUCT_SUB, {
    variables: { simulatorId: simulator.id },
    updateQuery: (previousResult, { subscriptionData }) => ({
      ...previousResult,
      simulators: subscriptionData.data.simulatorsUpdate
    })
  });
  const { simulators } = data;
  if (loading || !simulators) return null;
  const { ship } = simulators[0];
  const toggle = () => {
    setModal(!modal);
    setSetCode(false);
  };
  const activate = (time, force) => {
    if (ship.selfDestructTime && ship.selfDestructCode && !force) {
      setModal(false);
      setDeactivating(true);
      setDeactivateCode("");
      return;
    }
    const mutation = gql`
      mutation ActivateSelfDestruct($id: ID!, $time: Float) {
        setSelfDestructTime(simulatorId: $id, time: $time)
      }
    `;
    const variables = {
      id: simulator.id,
      time: ship.selfDestructTime ? null : time
    };
    client.mutate({
      mutation,
      variables
    });
    setModal(false);
    setDeactivating(false);
    setDeactivateCode("");
  };
  const setCodeFunc = code => {
    const mutation = gql`
      mutation SetSelfDestructCode($id: ID!, $code: String) {
        setSelfDestructCode(simulatorId: $id, code: $code)
      }
    `;
    const variables = {
      id: simulator.id,
      code: String(code)
    };
    client.mutate({
      mutation,
      variables
    });
    setModal(false);
    setSetCode(false);
  };
  const { selfDestructTime, selfDestructCode } = ship;
  const duration = Duration.fromObject({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: selfDestructTime
  }).normalize();
  return (
    <Container className="self-destruct">
      {modal ? (
        <SelfDestructModal
          modal={modal}
          toggle={toggle}
          activate={activate}
          code={selfDestructCode}
          setCode={setCode}
          setCodeFunc={setCodeFunc}
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
              onChange={evt => {
                setDeactivateCode(evt.target.value);
                if (evt.target.value === selfDestructCode) {
                  activate(null, true);
                }
              }}
            />
          </Col>
        </Row>
      ) : (
        <div className={`holder  ${selfDestructTime ? "on" : ""}`}>
          <div
            className="self-destruct-button"
            onClick={selfDestructTime ? activate : toggle}
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
              onChange={e => setPassword(e.target.value)}
            />
          </Col>
          <Col sm={6}>
            <Input
              type="password"
              placeholder="Verify Password"
              value={passwordVerify}
              onChange={e => setPasswordVerify(e.target.value)}
            />
          </Col>
          <Col sm={6}>
            <Button
              color="danger"
              block
              onClick={() => {
                setPassword("");
                setPasswordVerify("");
                setSettingCode(false);
              }}
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
                simulatorId: simulator.id,
                code: password
              }}
            >
              {action => (
                <Button
                  color="success"
                  block
                  disabled={
                    !password || !passwordVerify || password !== passwordVerify
                  }
                  onClick={() => {
                    action();
                    setSettingCode(false);
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
            onClick={() => setSettingCode(true)}
          >
            Set Self-Destruct Code
          </Button>
        </div>
      )}

      <Tour steps={trainingSteps} client={clientObj} />
    </Container>
  );
};

export default withApollo(SelfDestruct);

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
