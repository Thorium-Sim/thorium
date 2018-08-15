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
import { titleCase } from "change-case";
const components = [
  "AlertConditionCore",
  "CommShortRangeCore",
  "DamageReportsCore",
  "DamageTeamsCore",
  "DecontaminationCore",
  "DockingCore",
  "EngineControlCore",
  "ExocompsCore",
  "InterceptionCore",
  "InternalCommCore",
  "LRCommCore",
  "MedicalTeamsCore",
  "MessagingCore",
  "NavigationCore",
  "ProbeControlCore",
  "ReactivationCore",
  "ReactorControlCore",
  "RemoteCore",
  "SecurityTeamsCore",
  "SelfDestructCore",
  "SensorsCore",
  "ShieldControlCore",
  "ShuttlesCore",
  "SickbayCore",
  "SignalJammerCore",
  "StealthFieldCore",
  "TargetingCore",
  "ThxCore",
  "TorpedoCore",
  "TractorBeamCore",
  "TransporterCore"
];

class CoreFeedConfig extends Component {
  constructor(props) {
    super(props);
    const storedAllowed = localStorage.getItem("allowed_coreFeed");
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
          <div>Core Feed Config</div>
          <small>
            Configure which core feed items show up in this web browser.
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
                      "allowed_coreFeed",
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
                      "allowed_coreFeed",
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
                            "allowed_coreFeed",
                            JSON.stringify(this.state.allowed)
                          );
                        }
                      )
                    }
                  />{" "}
                  {titleCase(c.replace("Core", ""))}
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
export default CoreFeedConfig;
