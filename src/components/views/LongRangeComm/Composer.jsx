import React from "react";
import {useMutation} from "react-apollo";
import gql from "graphql-tag.macro";
import {Button, Row, Col, Container, Input} from "helpers/reactstrap";
import useFlightSessionStorage from "helpers/hooks/useFlightSessionStorage";

const SEND_MESSAGE = gql`
  mutation SendLRMessage($id: ID, $message: String!, $sender: String) {
    sendLongRangeMessage(
      simulatorId: $id
      crew: false
      message: $message
      decoded: true
      sender: $sender
    )
  }
`;
const MessageComposer = ({
  cancel,
  simulator,
  station,
  flight: {id: flightId},
}) => {
  const [message, setMessage] = useFlightSessionStorage(
    flightId,
    "composerMessage",
    "",
  );
  const [to, setTo] = useFlightSessionStorage(flightId, "composerTo", "");

  const updateTo = e => {
    setTo(e.target.value);
  };
  const updateMessage = e => {
    setMessage(e.target.value);
  };
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      id: simulator.id,
      message: `To: ${to}
${message}`,
      sender: station.name,
    },
  });
  const sendMessage = () => {
    sendMessageMutation();
    setTo("");
    setMessage("");
    cancel && cancel();
  };
  return (
    <Container fluid>
      <Row>
        <Col sm={2}>
          <h2>To:</h2>
        </Col>
        <Col sm={10}>
          <Input data-testid="composer-to" value={to} onChange={updateTo} />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Input
            data-testid="composer-message"
            type="textarea"
            style={{
              width: "100%",
              height: "20vw",
              resize: "none",
            }}
            value={message}
            onChange={updateMessage}
          />
        </Col>
      </Row>
      <Row>
        <Col sm={{size: 6}}>
          {cancel ? (
            <Button color="danger" onClick={cancel} block>
              Cancel
            </Button>
          ) : (
            <Button
              color="danger"
              onClick={() => {
                setTo("");
                setMessage("");
              }}
              block
            >
              Clear
            </Button>
          )}
        </Col>
        <Col sm={6}>
          <Button
            onClick={sendMessage}
            disabled={message.length === 0 || to.length === 0}
            block
          >
            Queue for Sending
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MessageComposer;
