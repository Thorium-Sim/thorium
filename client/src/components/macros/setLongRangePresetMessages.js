import React, { Fragment, Component } from "react";
import {
  Col,
  Row,
  Container,
  Label,
  Input,
  Button,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import FontAwesome from "react-fontawesome";

export default class LongRange extends Component {
  state = {};
  render() {
    const { updateArgs, args, client } = this.props;
    const { currentMessage } = this.state;
    const { messages = [] } = args;
    const message = messages.find((m, i) => i === currentMessage);
    return (
      <Container className="longRange-template">
        <Row>
          <Col
            sm={4}
            style={{
              minHeight: "400px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <p>
              <strong>Messages:</strong>
            </p>
            <ListGroup style={{ flex: 1, overflowY: "auto" }}>
              {messages.map((l, i) => (
                <ListGroupItem
                  key={`${i}-${l.label}`}
                  active={currentMessage === i}
                  onClick={() => this.setState({ currentMessage: i })}
                >
                  {l.label}{" "}
                  <FontAwesome
                    name="ban"
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      updateArgs(
                        "messages",
                        messages.filter((m, ii) => ii !== i)
                      )
                    }
                  />
                </ListGroupItem>
              ))}
            </ListGroup>
            <Button
              size="sm"
              onClick={() =>
                updateArgs(
                  "messages",
                  messages.concat({
                    label: "New Message",
                    value:
                      "To: #SIM\nFrom: Starbase 74\n\nWhat is your status, #SIM? We haven't heard from you in a while.\n\nStarbase 74 out."
                  })
                )
              }
            >
              New Message
            </Button>
          </Col>
          <Col sm={8}>
            {message && (
              <Fragment key={currentMessage}>
                <Input
                  type="text"
                  placeholder="label"
                  defaultValue={message.label}
                  onBlur={e => {
                    updateArgs(
                      "messages",
                      messages.map(
                        (m, i) =>
                          i === currentMessage
                            ? { ...m, label: e.target.value }
                            : m
                      )
                    );
                  }}
                />
                <Input
                  type="textarea"
                  rows="10"
                  defaultValue={message.value}
                  onBlur={e => {
                    updateArgs(
                      "messages",
                      messages.map(
                        (m, i) =>
                          i === currentMessage
                            ? { ...m, value: e.target.value }
                            : m
                      )
                    );
                  }}
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
