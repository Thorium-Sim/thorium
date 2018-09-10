import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import * as Components from "../../viewscreens";
import { titleCase } from "change-case";
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
          1: "auto",
          2: "ShipLogo",
          3: "RedAlert",
          4: "CollisionAlert",
          5: "Communications",
          6: "DamageMonitoring",
          7: "Overheating",
          8: "ViewscreenOffline",
          9: "RadiationMonitoring",
          0: "Blackout"
        };
    this.state = {
      allowed
    };
  }
  render() {
    const { modal, toggle } = this.props;
    return (
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <div>Viewscreen Hotkey Config</div>
          <small>
            Configure which viewscreen hotkeys are available in this browser.
            Hotkeys are accessed with 'Option' + 'Shift' + a number key
          </small>
        </ModalHeader>

        <ModalBody>
          <div className="flex-column" style={{ display: "flex" }}>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div>
                  {i}:{" "}
                  <select
                    value={this.state.allowed[i]}
                    onChange={e => {
                      console.log(e.target.value);
                      const value = e.target.value;
                      this.setState(
                        state => ({
                          allowed: { ...state.allowed, [i]: value }
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
                        <option value={c}>{titleCase(c)}</option>
                      ))}
                  </select>
                </div>
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
export default HotkeysConfig;
