import React, { Component } from "react";
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "helpers/reactstrap";
import * as Components from "../../viewscreens";
import { titleCase } from "change-case";
import ConfigComponent from "./ConfigComponent";

const components = Object.keys(Components).filter(
  c => c.indexOf("Config") === -1
);

class HotkeysConfig extends Component {
  constructor(props) {
    super(props);
    const storedAllowed = localStorage.getItem("allowed_viewscreenHotkeys");
    const allowed = storedAllowed
      ? JSON.parse(storedAllowed)
      : {
          1: { component: "auto", data: "{}" },
          2: { component: "ShipLogo", data: "{}" },
          3: { component: "RedAlert", data: "{}" },
          4: { component: "CollisionAlert", data: "{}" },
          5: { component: "Communications", data: "{}" },
          6: { component: "DamageMonitoring", data: "{}" },
          7: { component: "Overheating", data: "{}" },
          8: { component: "ViewscreenOffline", data: "{}" },
          9: { component: "RadiationMonitoring", data: "{}" },
          0: { component: "Blackout", data: "{}" }
        };
    this.state = {
      allowed,
      setConfig: null
    };
  }
  updateAllowed = value => {
    const i = this.state.setConfig;
    this.setState(
      state => ({
        allowed: {
          ...state.allowed,
          [i]: {
            component: state.allowed[i].component || state.allowed[i],
            data: value
          }
        }
      }),
      () => {
        localStorage.setItem(
          "allowed_viewscreenHotkeys",
          JSON.stringify(this.state.allowed)
        );
      }
    );
  };
  render() {
    const { modal, toggle } = this.props;
    const { setConfig, allowed } = this.state;
    return (
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          <div>Viewscreen Hotkey Config</div>
          <small>
            Configure which viewscreen hotkeys are available in this browser.
            Hotkeys are accessed with 'Option' + 'Shift' + a number key
          </small>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col sm={6}>
              <div className="flex-column" style={{ display: "flex" }}>
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <div key={`hotkey-${i}`}>
                      {i}:{" "}
                      <select
                        value={
                          this.state.allowed[i].component ||
                          this.state.allowed[i]
                        }
                        onChange={e => {
                          const value = e.target.value;
                          this.setState(
                            state => ({
                              allowed: {
                                ...state.allowed,
                                [i]: {
                                  data: state.allowed[i].data,
                                  component: value
                                }
                              }
                            }),
                            () => {
                              localStorage.setItem(
                                "allowed_viewscreenHotkeys",
                                JSON.stringify(this.state.allowed)
                              );
                            }
                          );
                        }}
                      >
                        <option value={"auto"}>Auto Viewscreens</option>
                        {components
                          .concat()
                          .sort()
                          .map(c => (
                            <option value={c} key={c}>
                              {titleCase(c)}
                            </option>
                          ))}
                      </select>
                      <Button
                        color="info"
                        size="sm"
                        disabled={setConfig === i}
                        onClick={() => this.setState({ setConfig: i })}
                      >
                        Config
                      </Button>
                    </div>
                  ))}
              </div>
            </Col>
            <Col sm={6} style={{ maxHeight: "50vh", overflowY: "auto" }}>
              <h4>Config</h4>
              {setConfig && (
                <ConfigComponent
                  simulator={this.props.simulator}
                  flightId={this.props.flightId}
                  data={allowed[setConfig].data || "{}"}
                  updateData={this.updateAllowed}
                  simple
                  component={allowed[setConfig].component || allowed[setConfig]}
                />
              )}
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
export default HotkeysConfig;
