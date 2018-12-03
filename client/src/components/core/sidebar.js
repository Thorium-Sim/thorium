import React, { Component } from "react";
import "./sidebar.scss";
import { Cores } from "components/views";
import { subscribe } from "helpers/pubsub";

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

class Sidebar extends Component {
  state = {
    sidebar: localStorage.getItem("thorium_coreSidebarItems")
      ? JSON.parse(localStorage.getItem("thorium_coreSidebarItems"))
      : defaultSidebar,
    positions: {},
    open: {},
    showing: {}
  };
  componentDidMount() {
    this.sub = subscribe("core_sidebar_update", () => {
      this.setState({
        sidebar: localStorage.getItem("thorium_coreSidebarItems")
          ? JSON.parse(localStorage.getItem("thorium_coreSidebarItems"))
          : defaultSidebar
      });
    });
  }
  updateShowing = () => {
    this.setState(state => ({
      showing: state.open
    }));
  };
  render() {
    const { sidebar, positions, open, showing } = this.state;
    return (
      <div className="core-sidebar">
        <div className="labels">
          {sidebar.map(s => (
            <div
              ref={el => {
                if (el && !this.state.positions[`${s.label}-${s.component}`]) {
                  const bounds = el.getBoundingClientRect();
                  this.setState(state => ({
                    positions: {
                      ...state.positions,
                      [`${s.label}-${s.component}`]: {
                        top: bounds.top,
                        bottom: bounds.bottom
                      }
                    }
                  }));
                }
              }}
              className="sidebar-label"
              key={`${s.label}-${s.component}`}
              onClick={() =>
                this.setState(
                  state => ({
                    open: {
                      [`${s.label}-${s.component}`]: !open[
                        `${s.label}-${s.component}`
                      ]
                    },
                    showing: {
                      ...state.showing,
                      [`${s.label}-${s.component}`]: true
                    }
                  }),
                  () => setTimeout(this.updateShowing, 500)
                )
              }
              style={{
                transform: `rotate(180deg) translate(0, ${
                  open[`${s.label}-${s.component}`] ? "-350px" : "0"
                })`
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
        <div className="sidebar-components">
          {sidebar.map(s => {
            if (!positions[`${s.label}-${s.component}`]) return null;
            const onBottom =
              window.innerHeight <
              positions[`${s.label}-${s.component}`].top + 300;
            const position = onBottom
              ? positions[`${s.label}-${s.component}`].bottom -
                window.innerHeight
              : positions[`${s.label}-${s.component}`].top;
            return (
              <div
                key={`component-${s.label}-${s.component}`}
                className={"sidebar-component"}
                style={{
                  bottom: onBottom ? 0 : null,
                  top: onBottom ? null : 0,
                  transform: `translate(${
                    open[`${s.label}-${s.component}`] ? "-350px" : "0"
                  }, ${position}px)`
                }}
              >
                {showing[`${s.label}-${s.component}`] &&
                  (() => {
                    const Comp = Cores[s.component];
                    if (!Comp) return null;
                    return <Comp {...this.props} />;
                  })()}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Sidebar;
