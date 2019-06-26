import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "helpers/reactstrap";
import { Cores } from "../../views";
import { publish } from "helpers/pubsub";
import { titleCase } from "change-case";
import FontAwesome from "react-fontawesome";

const defaultSidebar = [
  {
    label: "Timeline",
    component: "TimelineCore"
  },
  {
    label: "Transporters",
    component: "TransporterCore"
  },
  {
    label: "Ship",
    component: "ShipCore"
  },
  { label: "Core Feed", component: "CoreFeed" },
  { label: "Messaging", component: "NewMessagingCore" },
  { label: "Login Names", component: "LoginNameCore" },
  {
    label: "Tractor Beam",
    component: "TractorBeamCore"
  }
];
class NotificationConfig extends Component {
  state = {
    sidebar: localStorage.getItem("thorium_coreSidebar") === "true",
    sidebarItems: localStorage.getItem("thorium_coreSidebarItems")
      ? JSON.parse(localStorage.getItem("thorium_coreSidebarItems"))
      : defaultSidebar
  };
  render() {
    const { modal, toggle } = this.props;
    const { sidebar, sidebarItems } = this.state;
    return (
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>
          <div>Sidebar Config</div>
        </ModalHeader>

        <ModalBody>
          <label>
            <input
              type="checkbox"
              onChange={e => {
                localStorage.setItem("thorium_coreSidebar", e.target.checked);
                this.setState({ sidebar: e.target.checked }, () => {
                  publish("core_sidebar_update");
                });
              }}
              checked={sidebar}
            />{" "}
            Use Sidebar
          </label>
          <div>
            {sidebarItems.map((e, i) => (
              <div
                key={`${e.label}-${e.component}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Input
                  defaultValue={e.label}
                  onBlur={evt => {
                    const newSidebar = sidebarItems.map((s, ii) => {
                      if (i === ii) {
                        return { ...e, label: evt.target.value };
                      }
                      return s;
                    });
                    localStorage.setItem(
                      "thorium_coreSidebarItems",
                      JSON.stringify(newSidebar)
                    );
                    this.setState({ sidebarItems: newSidebar }, () => {
                      publish("core_sidebar_update");
                    });
                  }}
                />
                <Input
                  type="select"
                  value={e.component}
                  onChange={evt => {
                    const newSidebar = sidebarItems.map((s, ii) => {
                      if (i === ii) {
                        return { ...e, component: evt.target.value };
                      }
                      return s;
                    });
                    localStorage.setItem(
                      "thorium_coreSidebarItems",
                      JSON.stringify(newSidebar)
                    );
                    this.setState({ sidebarItems: newSidebar }, () => {
                      publish("core_sidebar_update");
                    });
                  }}
                >
                  {Object.keys(Cores)
                    .concat()
                    .sort()
                    .map(c => (
                      <option value={c} key={c}>
                        {titleCase(c)}
                      </option>
                    ))}
                </Input>
                <FontAwesome
                  name="ban"
                  className="text-danger"
                  onClick={() =>
                    this.setState(
                      state => ({
                        sidebarItems: state.sidebarItems.filter(
                          si =>
                            e.component !== si.component || e.label !== si.label
                        )
                      }),
                      () => {
                        localStorage.setItem(
                          "thorium_coreSidebarItems",
                          JSON.stringify(this.state.sidebarItems)
                        );
                        publish("core_sidebar_update");
                      }
                    )
                  }
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>
          {sidebarItems.length <= 8 && (
            <Button
              onClick={() =>
                this.setState(
                  state => ({
                    sidebarItems: state.sidebarItems.concat({
                      label: "New",
                      component: "ActionsCore"
                    })
                  }),
                  () => {
                    localStorage.setItem(
                      "thorium_coreSidebarItems",
                      JSON.stringify(this.state.sidebarItems)
                    );
                    publish("core_sidebar_update");
                  }
                )
              }
              color="success"
            >
              Add Sidebar Item
            </Button>
          )}
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
