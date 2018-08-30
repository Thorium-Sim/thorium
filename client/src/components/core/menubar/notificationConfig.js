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
  Label
} from "reactstrap";
const components = [
  "Alert Condition",
  "Damage Reports",
  "Damage Teams",
  "Decontamination",
  "Docking",
  "Engines",
  "External Sensors",
  "Interception",
  "Internal Sensors",
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
  "Self Destruct",
  "Shields",
  "Short Range Comm",
  "Sickbay",
  "Stealth Field",
  "THX",
  "Targeting",
  "Torpedos",
  "Tractor Beam",
  "Transporter"
];

class NotificationConfig extends Component {
  constructor(props) {
    super(props);
    const storedAllowed = localStorage.getItem("allowed_notifications");
    const allowed = storedAllowed
      ? JSON.parse(storedAllowed)
      : components.reduce((prev, next) => {
          prev[next] = true;
          return prev;
        }, {});
    this.state = {
      allowed
    };
  }
  render() {
    const { modal, toggle } = this.props;
    const { allowed } = this.state;
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <div>Notification Config</div>
          <small>
            Configure which notifications items show up in this web browser.
          </small>
        </ModalHeader>

        <ModalBody>
          <ButtonGroup>
            <Button
              size="sm"
              color="danger"
              onClick={() =>
                this.setState(
                  state => ({
                    allowed: components.reduce((prev, next) => {
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
                    allowed: components.reduce((prev, next) => {
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
            {components.map(c => (
              <FormGroup key={c} check style={{ width: "50%" }}>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={allowed[c] || false}
                    onChange={() =>
                      this.setState(
                        state => ({
                          allowed: { ...state.allowed, [c]: !state.allowed[c] }
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
