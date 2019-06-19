import React, { Component } from "react";
import * as Layouts from "./layouts";
import Hotkey from "./hotkey";

import { ListGroup, ListGroupItem } from "reactstrap";
import Alerts from "../generic/Alerts";

import "./CoreComponents.scss";
import Menubar from "./menubar";
import Sidebar from "./sidebar";
import { subscribe } from "helpers/pubsub";
class CoreComponents extends Component {
  state = {
    simulator: null,
    layout: localStorage.getItem("thorium_coreLayout") || "Next",
    mosaic: JSON.parse(localStorage.getItem("thorium_coreMosaic")) || null,
    notifications: localStorage.getItem("thorium_coreNotifications") === "true",
    speech: localStorage.getItem("thorium_coreSpeech") === "true",
    sidebar: localStorage.getItem("thorium_coreSidebar") === "true",
    editable: false,
    issuesOpen: false
  };
  componentDidMount() {
    this.calculateSimulator();
    this.sub = subscribe("core_sidebar_update", () => {
      this.setState({
        sidebar: localStorage.getItem("thorium_coreSidebar") === "true"
      });
    });
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
  componentDidUpdate() {
    this.calculateSimulator();
  }
  calculateSimulator() {
    const { simulator } = this.state;
    const { simulators } = this.props;
    if (simulator) return;
    if (simulators.length === 1) {
      this.setState({
        simulator: simulators[0].id
      });
      localStorage.setItem("thorium_coreSimulator", simulators[0].id);
    }
    if (
      simulators.indexOf(
        s => s.id === localStorage.getItem("thorium_coreSimulator")
      ) > -1
    ) {
      this.setState({
        simulator: localStorage.getItem("thorium_coreSimulator")
      });
      return;
    }
    if (simulators.length === 0) {
      this.setState({
        simulator: "test"
      });
    }
  }
  pickSimulator = e => {
    const simulator = e.target.value;
    this.setState({
      simulator
    });
    localStorage.setItem("thorium_coreSimulator", simulator);
  };
  pickLayout = e => {
    this.setState({
      layout: e.target.value
    });
    localStorage.setItem("thorium_coreLayout", e.target.value);
  };
  updateMosaic = mosaic => {
    this.setState({
      mosaic
    });
    localStorage.setItem("thorium_coreMosaic", JSON.stringify(mosaic));
  };
  setNotifications = e => {
    this.setState({ notifications: e.target.checked });
    localStorage.setItem("thorium_coreNotifications", e.target.checked);
  };
  setSpeech = e => {
    this.setState({ speech: e.target.checked });
    localStorage.setItem("thorium_coreSpeech", e.target.checked);
  };
  render() {
    const { flight, simulators } = this.props;
    const {
      notifications,
      simulator,
      speech,
      mosaic,
      layout,
      editable,
      sidebar
    } = this.state;
    const LayoutComponent = Layouts[layout];
    return (
      <div
        style={{ backgroundColor: "#333", color: "white" }}
        className="core-container"
      >
        <Menubar
          flight={flight}
          simulators={simulators}
          simulator={simulator}
          pickSimulator={this.pickSimulator}
          pickLayout={this.pickLayout}
          layout={layout}
          mosaic={mosaic}
          setMosaic={this.updateMosaic}
          editable={editable}
          setEdit={e => this.setState({ editable: e })}
          notifications={notifications}
          speech={speech}
          setNotifications={this.setNotifications}
          setSpeech={this.setSpeech}
        />
        <div
          id="core-layout"
          className={!editable ? "non-editing" : ""}
          style={{
            display: simulator ? "block" : "none",
            height: "calc(100vh - 26px)",
            width: `calc(100% - ${sidebar ? 24 : 0}px)`,
            backgroundColor: "#333"
          }}
        >
          {LayoutComponent && simulator && (
            <LayoutComponent
              {...this.props}
              edit={editable}
              editMode={() => this.setState({ editable: true })}
              mosaic={mosaic}
              updateMosaic={this.updateMosaic}
              simulator={
                simulators.find(s => s.id === simulator) || {
                  id: simulator
                }
              }
            />
          )}
        </div>
        {simulator && sidebar && (
          <Sidebar
            {...this.props}
            simulator={
              simulators.find(s => s.id === simulator) || {
                id: simulator
              }
            }
          />
        )}
        {!simulator && (
          <ListGroup style={{ maxWidth: "500px" }}>
            {simulators.map(s => (
              <ListGroupItem
                onClick={() => this.pickSimulator({ target: { value: s.id } })}
                key={s.id}
                style={{
                  color: "black",
                  fontSize: "24px"
                }}
              >
                {s.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        )}

        {simulator && (
          <Alerts
            ref="alert-widget"
            disabled={!notifications}
            speech={speech}
            simulator={{ id: this.state.simulator }}
            station={{ name: "Core" }}
          />
        )}
        <Hotkey
          {...this.props}
          simulator={
            simulators.find(s => s.id === simulator) || {
              id: simulator
            }
          }
        />
      </div>
    );
  }
}

export default CoreComponents;
