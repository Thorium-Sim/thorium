import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  Button,
  FormGroup,
  Input,
  Label,
  Col,
  Row
} from "reactstrap";

export const notifyComponents = [
  "Alert Condition",
  "Cargo",
  "Damage Reports",
  "Damage Teams",
  "Decontamination",
  "Docking",
  "Engines",
  "External Sensors",
  "Handheld Scanner",
  "Interception",
  "Internal Comm",
  "Internal Sensors",
  "Jump Drive",
  "Keypad",
  "Long Range Comm",
  "Medical Teams",
  "Navigation",
  "Phasers",
  "Probes",
  "Railgun",
  "Reactivation Code",
  "Reactor",
  "Remote Access",
  "Security Teams",
  "Security Doors",
  "Self Destruct",
  "Shields",
  "Short Range Comm",
  "Sickbay",
  "Signal Jammer",
  "Stealth Field",
  "THX",
  "Targeting",
  "Torpedos",
  "Tractor Beam",
  "Transporter",
  "Transwarp"
];

class NotificationConfig extends Component {
  constructor(props) {
    super(props);
    const storedAllowed = localStorage.getItem("allowed_notifications");
    const storedSpeech = localStorage.getItem("allowed_speech");
    const allowed = storedAllowed
      ? JSON.parse(storedAllowed)
      : notifyComponents.reduce((prev, next) => {
          prev[next] = true;
          return prev;
        }, {});
    const speech = storedSpeech
      ? JSON.parse(storedSpeech)
      : notifyComponents.reduce((prev, next) => {
          prev[next] = true;
          return prev;
        }, {});
    this.state = {
      allowed,
      speech
    };
  }
  render() {
    const { modal, toggle } = this.props;
    const { allowed, speech } = this.state;
    return (
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          <div>Notification Config</div>
          <small>
            Configure which notifications items show up in this web browser.
          </small>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col sm={6}>
              <h3>Text Notifications</h3>
              <ButtonGroup>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() =>
                    this.setState(
                      state => ({
                        allowed: notifyComponents.reduce((prev, next) => {
                          prev[next] = false;
                          return prev;
                        }, {})
                      }),
                      () => {
                        localStorage.setItem(
                          "allowed_notifications",
                          JSON.stringify(this.state.allowed)
                        );
                      }
                    )
                  }
                >
                  Uncheck All
                </Button>
                <Button
                  size="sm"
                  color="success"
                  onClick={() =>
                    this.setState(
                      state => ({
                        allowed: notifyComponents.reduce((prev, next) => {
                          prev[next] = true;
                          return prev;
                        }, {})
                      }),
                      () => {
                        localStorage.setItem(
                          "allowed_notifications",
                          JSON.stringify(this.state.allowed)
                        );
                      }
                    )
                  }
                >
                  Check All
                </Button>
              </ButtonGroup>
              <div className="flex-row flex-wrap" style={{ display: "flex" }}>
                {notifyComponents.map(c => (
                  <FormGroup key={c} check style={{ width: "50%" }}>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={allowed[c] || false}
                        onChange={() =>
                          this.setState(
                            state => ({
                              allowed: {
                                ...state.allowed,
                                [c]: !state.allowed[c]
                              }
                            }),
                            () => {
                              localStorage.setItem(
                                "allowed_notifications",
                                JSON.stringify(this.state.allowed)
                              );
                            }
                          )
                        }
                      />{" "}
                      {c}
                    </Label>
                  </FormGroup>
                ))}
              </div>
            </Col>
            <Col sm={6}>
              <h3>Speech Notifications</h3>
              <ButtonGroup>
                <Button
                  size="sm"
                  color="danger"
                  onClick={() =>
                    this.setState(
                      state => ({
                        speech: notifyComponents.reduce((prev, next) => {
                          prev[next] = false;
                          return prev;
                        }, {})
                      }),
                      () => {
                        localStorage.setItem(
                          "allowed_speech",
                          JSON.stringify(this.state.speech)
                        );
                      }
                    )
                  }
                >
                  Uncheck All
                </Button>
                <Button
                  size="sm"
                  color="success"
                  onClick={() =>
                    this.setState(
                      state => ({
                        speech: notifyComponents.reduce((prev, next) => {
                          prev[next] = true;
                          return prev;
                        }, {})
                      }),
                      () => {
                        localStorage.setItem(
                          "allowed_speech",
                          JSON.stringify(this.state.speech)
                        );
                      }
                    )
                  }
                >
                  Check All
                </Button>
              </ButtonGroup>
              <div className="flex-row flex-wrap" style={{ display: "flex" }}>
                {notifyComponents.map(c => (
                  <FormGroup key={c} check style={{ width: "50%" }}>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={speech[c] || false}
                        onChange={() =>
                          this.setState(
                            state => ({
                              speech: {
                                ...state.speech,
                                [c]: !state.speech[c]
                              }
                            }),
                            () => {
                              localStorage.setItem(
                                "allowed_speech",
                                JSON.stringify(this.state.speech)
                              );
                            }
                          )
                        }
                      />{" "}
                      {c}
                    </Label>
                  </FormGroup>
                ))}
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
export default NotificationConfig;
